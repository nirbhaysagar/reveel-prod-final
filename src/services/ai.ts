// ============================================
// AI SERVICE - Pluggable Provider (OpenAI | Hugging Face)
// ============================================
// Purpose: Generate AI-powered insights and reports
// Why: Allow testing with Hugging Face free API and switch back to OpenAI later
// Providers:
//  - OpenAI (default): Uses official OpenAI SDK
//  - Hugging Face: Uses Inference API via fetch

// Dynamic import for OpenAI to prevent build-time initialization
// This prevents the SDK from checking for API keys during Next.js build

const AI_PROVIDER = (process.env.AI_PROVIDER || 'openai').toLowerCase()

// Check if we're in build mode
// Next.js sets NEXT_PHASE during build, and npm sets npm_lifecycle_event
const isBuildTime = typeof window === 'undefined' && (
  process.env.NEXT_PHASE === 'phase-production-build' || 
  process.env.npm_lifecycle_event === 'build' ||
  (process.env.NODE_ENV === 'production' && !process.env.VERCEL && !process.env.OPENAI_API_KEY)
)

// OpenAI client (lazy-loaded using dynamic import)
let openaiClient: any = null
let OpenAIClass: any = null

async function getOpenAIClient() {
  // Don't initialize during build
  if (isBuildTime) {
    throw new Error('OpenAI client cannot be initialized during build')
  }
  
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set')
  }
  
  // Dynamically import OpenAI only when needed
  if (!OpenAIClass) {
    const OpenAIModule = await import('openai')
    OpenAIClass = OpenAIModule.default
  }
  
  if (!openaiClient) {
    try {
      openaiClient = new OpenAIClass({ 
        apiKey: process.env.OPENAI_API_KEY,
        // Allows OpenAI-compatible providers like Grok (xAI) or OpenRouter
        baseURL: process.env.OPENAI_BASE_URL || undefined,
      })
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error)
      throw error
    }
  }
  
  return openaiClient
}

// Hugging Face config
const HF_API_KEY = process.env.HF_API_KEY
// Reasonable default small model; can be overridden via env
const HF_MODEL = process.env.HF_MODEL || 'google/gemma-2-2b-it'

async function hfGenerateText(prompt: string, {
  maxTokens = 300,
  temperature = 0.7,
}: { maxTokens?: number; temperature?: number } = {}): Promise<string> {
  if (!HF_API_KEY) {
    throw new Error('HF_API_KEY is not set')
  }

  const response = await fetch(`https://api-inference.huggingface.co/models/${encodeURIComponent(HF_MODEL)}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: maxTokens,
        temperature,
        return_full_text: false,
      },
    }),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`HF API error: ${response.status} ${text}`)
  }

  // HF responses vary by model; common format is an array with generated_text
  const data = await response.json()
  if (Array.isArray(data) && data[0]?.generated_text) {
    return String(data[0].generated_text)
  }
  // Some TGI endpoints return { generated_text }
  if (data?.generated_text) {
    return String(data.generated_text)
  }
  // Fallback: stringify
  return typeof data === 'string' ? data : JSON.stringify(data)
}

async function openaiChat(prompt: string, {
  maxTokens = 300,
  temperature = 0.7,
}: { maxTokens?: number; temperature?: number } = {}): Promise<string> {
  // Check if we're in build mode or missing API key
  if (isBuildTime || !process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API is not available during build or API key is missing')
  }
  
  const openai = await getOpenAIClient()
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a concise competitive intelligence analyst.' },
      { role: 'user', content: prompt },
    ],
    temperature,
    max_tokens: maxTokens,
  })
  return res.choices[0].message.content || ''
}

async function aiGenerateText(prompt: string, opts?: { maxTokens?: number; temperature?: number }): Promise<string> {
  if (AI_PROVIDER === 'hf' || AI_PROVIDER === 'huggingface') {
    return hfGenerateText(prompt, opts)
  }
  return openaiChat(prompt, opts)
}

// ============================================
// GENERATE CHANGE INSIGHT
// ============================================
// What: Generate a summary for a single change
// Why: Help users understand what changed and why it matters
// How: Use GPT-4 to analyze the change

export async function generateChangeInsight(changeData: {
  competitorName: string
  changeType: string
  oldValue: string
  newValue: string
  timestamp: string
}): Promise<string> {
  const prompt = `You are a competitive intelligence analyst. Analyze this competitor change and provide a concise, actionable insight (2-3 sentences).

Competitor: ${changeData.competitorName}
Change Type: ${changeData.changeType}
Old Value: ${changeData.oldValue}
New Value: ${changeData.newValue}
Timestamp: ${changeData.timestamp}

Include: what changed, business impact, and what to monitor next.`

  try {
    const text = await aiGenerateText(prompt, { maxTokens: 200, temperature: 0.7 })
    return text || 'Unable to generate insight'
  } catch (error) {
    console.error('Error generating insight:', error)
    return 'Unable to generate insight at this time'
  }
}

// ============================================
// GENERATE WEEKLY REPORT
// ============================================
// What: Generate comprehensive weekly report
// Why: Give users a complete overview of all competitor activity
// How: Analyze all changes from the week

export async function generateWeeklyReport(competitorsData: {
  competitorName: string
  changes: Array<{
    type: string
    oldValue: string
    newValue: string
    timestamp: string
  }>
}[]): Promise<{
  summary: string
  keyChanges: string[]
  recommendations: string[]
}> {
  // Build the prompt with all competitor data
  const competitorsText = competitorsData
    .map((comp) => {
      const changesText = comp.changes
        .map((change) => `- ${change.type}: ${change.oldValue} → ${change.newValue}`)
        .join('\n')
      
      return `${comp.competitorName}:\n${changesText}`
    })
    .join('\n\n')

  const prompt = `You are a competitive intelligence analyst. Generate a weekly report as strict JSON with keys: summary, keyChanges[], recommendations[].

DATA:\n\n${competitorsText}\n\nReturn only JSON.`

  try {
    let content: string
    if (AI_PROVIDER === 'openai') {
      // Use OpenAI with a JSON-leaning prompt (no response_format to keep SDK simple)
      content = await openaiChat(prompt, { maxTokens: 1000, temperature: 0.7 })
    } else {
      content = await hfGenerateText(prompt, { maxTokens: 600, temperature: 0.7 })
    }

    // Attempt to extract JSON if model added extra text
    const jsonMatch = content.match(/\{[\s\S]*\}$/)
    const jsonText = jsonMatch ? jsonMatch[0] : content
    const parsed = JSON.parse(jsonText)
    return {
      summary: parsed.summary || 'No summary available',
      keyChanges: parsed.keyChanges || [],
      recommendations: parsed.recommendations || [],
    }
  } catch (error) {
    console.error('Error generating weekly report:', error)
    return {
      summary: 'Unable to generate report at this time',
      keyChanges: [],
      recommendations: [],
    }
  }
}

// ============================================
// GENERATE COMPETITOR SUMMARY
// ============================================
// What: Generate summary for a single competitor
// Why: Quick overview of competitor activity
// How: Analyze all changes for one competitor

export async function generateCompetitorSummary(
  competitorName: string,
  changes: Array<{
    type: string
    oldValue: string
    newValue: string
    timestamp: string
  }>
): Promise<string> {
  if (changes.length === 0) {
    return `${competitorName} has had no significant changes recently.`
  }

  const changesText = changes
    .map((change) => `- ${change.type}: ${change.oldValue} → ${change.newValue}`)
    .join('\n')

  const prompt = `Analyze recent activity and provide a concise 2-3 sentence summary.\n\nCompetitor: ${competitorName}\n\nChanges:\n${changesText}`

  try {
    const text = await aiGenerateText(prompt, { maxTokens: 180, temperature: 0.7 })
    return text || 'Unable to generate summary'
  } catch (error) {
    console.error('Error generating competitor summary:', error)
    return 'Unable to generate summary at this time'
  }
}

// ============================================
// GENERATE RECOMMENDATION
// ============================================
// What: Generate actionable recommendation
// Why: Help users decide what to do next
// How: Analyze changes and suggest actions

export async function generateRecommendation(
  changeType: string,
  oldValue: string,
  newValue: string
): Promise<string> {
  const prompt = `You are a competitive intelligence analyst. Provide ONE specific, actionable recommendation (1 sentence) based on this change.\n\nType: ${changeType}\nOld: ${oldValue}\nNew: ${newValue}`

  try {
    const text = await aiGenerateText(prompt, { maxTokens: 100, temperature: 0.7 })
    return text || 'Monitor this change closely'
  } catch (error) {
    console.error('Error generating recommendation:', error)
    return 'Monitor this change closely'
  }
}
