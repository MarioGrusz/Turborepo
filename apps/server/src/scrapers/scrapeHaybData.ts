import extractCoffeeOrigin from "./helpers/extractCoffeeOrigin.js";
import launchBrowserAndNewPage from "./helpers/launchBrowser.js";
import { ProductData } from 'shared';


interface LinkCollector {
    newProduct: (product: ProductData) => void;
    onError: (error: Error) => boolean;
}
  
type Scraper = (collector: LinkCollector) => Promise<void>;


function linkCollector(onNewLink: (link: string) => null): LinkCollector {
 return {
    addLink: (link: string, scraperName: string) => {
      onNewLink(link);
    },
 };
}

async function genericScraper(LinkCollector: LinkCollector, stringUrl: string): Promise<Scraper> {
 return async (linkCollector: LinkCollector) => {
    const { browser, page } = await launchBrowserAndNewPage();
    await page.goto(stringUrl);
 };
}

  

const getHAYBProductData = async (): Promise<ProductData[]> => {

    const { browser, page } = await launchBrowserAndNewPage();
    await page.goto('https://haybcoffee.pl/en/product-category/coffee/');
    const productData: ProductData[] = [];

   
    const shopName = await page.$eval('.wp-block-columns > .wp-block-column:nth-child(2) > h2', (el) => {
        if (el.textContent) return el.textContent.trim();
        else return '';
    });
    
    const hrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.woocommerce-loop-product__link')).map(a => (a as HTMLAnchorElement).href);
    });
    

    for (const url of hrefs) {
        try {
            await page.goto(url);
            const productNameElement = await page.$('.product-detail-content > .product-detail-value');
            if (!productNameElement) continue;
            const productName = await productNameElement.evaluate((el) => el.textContent?.trim()) ?? '';
            const productOrigin = extractCoffeeOrigin(productName);
            const productImage = await page.$eval('.woocommerce-product-gallery__image > a', el => el.getAttribute('href')) ?? '';
            const productPrice = await page.$eval('.price-value', (el) => `${el.textContent?.trim()}€`);

            productData.push({
            shopName,
            productName,
            productPrice,
            productImage,
            productLink: url,
            productOrigin,
            });
        } catch (error) {
            console.error(`Error processing URL ${url}:`, error);
        }
    }

    await browser.close();
    return productData;
};

export default getHAYBProductData;
   