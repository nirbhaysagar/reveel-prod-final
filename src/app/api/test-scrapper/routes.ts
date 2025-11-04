import { NextRequest, NextResponse } from 'next/server'
import { scrapeCompetitor } from '@/src/services/scraper'

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get('url')
    const selector = searchParams.get('selector')

    //validation
    if(!url) {
        return NextResponse.json({
            error:'url parameter is required',
            example:'/api/test-scrapper?url=https://www.google.com',
        }, {status: 400})
    }

    try{
        //scrape the website
        console.log('Scraping website:', url)
        console.log('Selector:', selector || 'none')

        const result = await scrapeCompetitor(url, selector)

        //reeturn the result
        return NextResponse.json({
            success: true,
            data:{
                url: result.url,
                timestamp: result.timestamp,
                screenshot: result.screenshot,
                extractData: result.extractData,
                html: result.html,
            }
        })
     } catch(error) {
        console.error('Error scraping competitor:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to scrape competitor',
        }, {status: 500})
     }
}