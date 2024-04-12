import { describe, expect, it } from 'vitest';
import getHAYBProductData from '../scrapeHaybData.js';

interface Queue<T> {
    unshift: (item: T) => Promise<void>;
    pop: () => Promise<T>;
    isOpen: () => boolean;
    close: () => void;
}

// async function linkProcessor(inQueue: Queue<({link: string, type: string)}>,  ,outQueue: Queue<ProductData>){
//   while (inQueue.isOpen()) {
//     const {link, process} = await inQueue.pop();
//
//     await outQueue.unshift(await process (link))
//   }
// }

describe('getHaybCoffeeProductData', () => {
  it('should extract product data correctly', async () => {
    const queue = Queue();
    const productData: Array<ProductData> = [] ;

    const newLinkHandler = (link) => links.push(link);


     await Promise.all([linkCollector(queue), linkProcessor(queue)])






    await getHAYBProductData(newProduct => productData.push(newProduct));

    expect(productData).toBeDefined();
    expect(productData.length).toBeGreaterThan(0);

    productData.forEach(item => {
      expect(item).toHaveProperty('shopName', expect.any(String));
      expect(item).toHaveProperty('productName', expect.any(String));
      expect(item).toHaveProperty('productOrigin', expect.any(String));
      expect(item).toHaveProperty('productPrice', expect.any(String));
      expect(item).toHaveProperty('productImage', expect.any(String));
      expect(item).toHaveProperty('productLink', expect.any(String));

    })
  }, { timeout: 0})
})
