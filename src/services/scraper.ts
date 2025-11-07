import { chromium, Browser, Page } from 'playwright'

export class ScrapperService {
    private browser: Browser | null = null

    async init() {
        try {
            this.browser = await chromium.launch({
                headless: true,
            })
        } catch (error) {
            throw new Error(`Failed to launch browser: ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    async scrape(url: string, selector?: string) {
        if (!this.browser) {
            await this.init()
        }

        const page = await this.browser!.newPage()
        try {
            if (!url || typeof url !== 'string') {
                throw new Error('Invalid URL provided')
            }

            let navigateError: Error | null = null
            try {
                await page.goto(url, {
                    waitUntil: 'networkidle',
                    timeout: 60000,
                })
            } catch (error) {
                navigateError = error instanceof Error ? error : new Error(String(error))
                console.error(`Navigation error for ${url}:`, navigateError.message)
                throw new Error(`Failed to navigate to ${url}: ${navigateError.message}`)
            }

            let screenshot: Buffer | null = null
            try {
                screenshot = await page.screenshot({
                    fullPage: true,
                })
            } catch (error) {
                console.error(`Screenshot capture failed for ${url}:`, error)
                throw new Error(`Failed to capture screenshot: ${error instanceof Error ? error.message : String(error)}`)
            }

            let extractData: string | null = null
            if (selector) {
                try {
                    const element = await page.locator(selector).first()
                    const count = await element.count()
                    
                    if (count > 0) {
                        extractData = await element.textContent()
                    } else {
                        console.warn(`Selector "${selector}" not found on page ${url}`)
                    }
                } catch (error) {
                    console.error(`Error extracting data with selector "${selector}":`, error)
                    throw new Error(`Failed to extract data from selector: ${error instanceof Error ? error.message : String(error)}`)
                }
            }

            let html: string | null = null
            try {
                html = await page.content()
            } catch (error) {
                console.error(`Failed to get page content for ${url}:`, error)
                throw new Error(`Failed to retrieve page content: ${error instanceof Error ? error.message : String(error)}`)
            }

            return {
                screenshot: screenshot ? screenshot.toString('base64') : null,
                extractData,
                html,
                url,
                timestamp: new Date().toISOString(),
                status: 'success',
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error)
            console.error(`Scrape failed for ${url}:`, errorMessage)
            throw error
        } finally {
            try {
                await page.close()
            } catch (error) {
                console.error('Error closing page:', error)
            }
        }
    }

    async close() {
        if (this.browser) {
            try {
                await this.browser.close()
            } catch (error) {
                console.error('Error closing browser:', error)
            } finally {
                this.browser = null
            }
        }
    }
}

export async function scrapeCompetitor(url: string, selector?: string) {
    const scrapper = new ScrapperService()

    try {
        await scrapper.init()
        const result = await scrapper.scrape(url, selector)
        return result
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error(`scrapeCompetitor failed for ${url}:`, errorMessage)
        throw error
    } finally {
        await scrapper.close()
    }
}

