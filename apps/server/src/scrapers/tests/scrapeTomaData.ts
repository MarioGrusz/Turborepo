import { describe, expect, it } from 'vitest';
import getTomaCoffeeProductData from '../scrapeTomaData.js';

describe('getTomaCoffeeProductData', () => {
  it('should extract product data correctly', async () => {

    const productData = await getTomaCoffeeProductData();

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
  })
})


