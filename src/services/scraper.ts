//purpose: scrape compeitior webssite and exxtrcat data from the website

import { timeStamp } from 'console'
import { chromium, Browser, Page } from 'playwright'

//scrapper class
export class ScrapperService{

    //store the browser instance
    private browser: Browser | null = null
    //iitialize the browser
    async init() {
        this.browser = await chromium.launch({
            headless: true,
        })
    }

    //scrape website
    async scrape(url: string, selector?: string) {
        //if browser is not initializes, initialize it
        if(!this.browser) {
            await this.init()
        }

        //create a new page, cause each scarpe need a new page
        const page = await this.browser!.newPage()
        try{

            //navaigate to the 
            // url and wait for the page to load
            await page.goto(url, {
                waitUntil: 'networkidle',
                timeout: 60000,
            })

            //take screenshot
            const screenshot = await page.screenshot({
                fullPage: true,
            })

            //extract data from the page
            let extractData = null
            //if selector is provided, extract data from the page
            if(selector) {
                const element = await page.locator(selector).first()

                //check if elemts exists
                if(await element.count() > 0) {
                    extractData = await element.textContent()
                }
            }


            //get full html
            const html = await page.content()
            //return the data
            return {
                screenshot: screenshot.toString('base64'),
                extractData,
                html,
                url,
                timestamp: new Date().toISOString(),//when it was scrapped
            }

        }finally {
            await page.close()

        }

    }

    async close() {
        if(this.browser) {
            await this.browser!.close()
            this.browser = null
        }
    }
}


//helper function
export async function scrapeCompetitor(url: string, selector?: string) {
    const scrapper = new ScrapperService()

    try{
        //initilaize browser
        await scrapper.init()
        //scrape the website
        const result = await scrapper.scrape(url, selector)
        return result
    }finally {
        await scrapper.close()
    }
}

