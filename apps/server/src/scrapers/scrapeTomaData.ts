import extractCoffeeOrigin from "./helpers/extractCoffeeOrigin.js";
import launchBrowserAndNewPage from "./helpers/launchBrowser.js";
import { ProductData } from 'shared'
import { Page, ElementHandle } from "puppeteer";



//update this part and add link queque link collctor and processor




const getTomaCoffeeProductData = async(): Promise<ProductData[]> => {
    const { browser, page } = await launchBrowserAndNewPage();
    await page.goto('https://toma.cafe/en/shop/cafe');


    const productHandles = await page.$$('section.svelte-vz66ne:nth-child(1) > .grid.svelte-86dgh1 > a.svelte-86dgh1');
    const productHandlesToScrape = productHandles.slice(2);

    const shopName = await extractShopName(page);

    const productDataPromises = productHandlesToScrape.map(handle => extractProductData(handle, shopName));
    const productData = (await Promise.all(productDataPromises)).filter((data): data is ProductData => data !== null);

    await browser.close();
    return productData;
}


const extractShopName = async (page: Page): Promise<string> => {
    return await page.$eval('.column.svelte-1i6cx3 > p', (el) => {
        if (el.textContent) {
            const input = el.textContent;
            const pattern = / - (.+)$/;
            const result = input.match(pattern);
            return result ? result[1] : '';
        } else {
            return '';
        }
    });
}


const extractProductData = async (producthandle: ElementHandle, shopName: string): Promise<ProductData | null> => {
    try {
        const productName = await producthandle.$eval('.product-title', (el) => el.textContent);
        const productPrice = await producthandle.$eval('.minprice', (el) => el.textContent) ?? '';
        const productImage = await producthandle.$eval('img.svelte-v51jn4', (el) => el.getAttribute('src')) ?? '';
        const productLink = await (await producthandle.getProperty('href')).jsonValue();

        if (typeof productLink !== 'string') {
            throw new Error('Product link is not a string');
        }


        if (productName) {
            const productOrigin = extractCoffeeOrigin(productName);

            return {
                shopName,
                productName,
                productOrigin,
                productPrice,
                productImage,
                productLink,
            };
        } else {
            console.error('Product name is null');
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    } 
}

export default getTomaCoffeeProductData

 


 
