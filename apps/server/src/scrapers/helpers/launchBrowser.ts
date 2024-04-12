import puppeteer from "puppeteer";

const launchBrowserAndNewPage = async () => {
    const browser = await puppeteer.launch({
        headless: true, 
        defaultViewport: null,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
 
    const page = await browser.newPage();
    return { browser, page };
};

export default launchBrowserAndNewPage