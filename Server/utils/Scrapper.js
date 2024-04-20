const puppeteer = require('puppeteer-core');

const SBR_WS_ENDPOINT = 'wss://brd-customer-hl_3d930120-zone-bookingapp:3up3ww12e3i4@brd.superproxy.io:9222';

 async function main(url) {
    console.log('Connecting to Scraping Browser...');
    const browser = await puppeteer.connect({
        browserWSEndpoint: SBR_WS_ENDPOINT,
    });
    try {
        const page = await browser.newPage();
        console.log(`Connected! Navigating to ${url}`);
        await page.goto(url);
        // CAPTCHA handling: If you're expecting a CAPTCHA on the target page, use the following code snippet to check the status of Scraping Browser's automatic CAPTCHA solver
        // const client = await page.createCDPSession();
        // console.log('Waiting captcha to solve...');
        // const { status } = await client.send('Captcha.waitForSolve', {
        //     detectTimeout: 10000,
        // });
        // console.log('Captcha solve status:', status);
        console.log('Navigated! Scraping page content...');
        const html = await page.content();
        console.log(html)
    }catch(err){
        console.error(err.stack || err);
        process.exit(1);
    }finally {
        await browser.close();
    }

}

module.exports={
    main
}