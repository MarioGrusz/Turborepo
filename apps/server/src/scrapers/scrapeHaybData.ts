import extractCoffeeOrigin from "./helpers/extractCoffeeOrigin.js";
import launchBrowserAndNewPage from "./helpers/launchBrowser.js";
import { ProductData } from 'shared';

//design scraper architecture



interface LinkCollector {
    newProduct: (product: ProductData) => void;
    onError: (error: Error) => boolean;
}

type NewProductHandler = (product: ProductData) => void;

const getHAYBProductData = async (onNewProduct:NewProductHandler = () => {}): Promise<ProductData[]> => {
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
    console.log("urls", hrefs)

    for (const url of hrefs) {
        try {
            await page.goto(url);
            const productNameElement = await page.$('.product-detail-content > .product-detail-value');
            if (!productNameElement) continue;
            const productName = await productNameElement.evaluate((el) => el.textContent?.trim()) ?? '';
            const productOrigin = extractCoffeeOrigin(productName);
            const productImage = await page.$eval('.woocommerce-product-gallery__image > a', el => el.getAttribute('href')) ?? '';
            const productPrice = await page.$eval('.price-value', (el) => `${el.textContent?.trim()}€`);
            const product = {
                shopName,
                productName,
                productPrice,
                productImage,
                productLink: url,
                productOrigin,
            }
            onNewProduct(product)
            // productData.push(product);
        } catch (error) {
            console.error(`Error processing URL ${url}:`, error);
        }
    }

    await browser.close();
    return productData;
};


getHAYBProductData()

export default getHAYBProductData;