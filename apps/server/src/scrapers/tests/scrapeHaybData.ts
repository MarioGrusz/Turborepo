import { describe, expect, it } from 'vitest';
import getHAYBProductData from '../scrapeHaybData.js';

describe('getHaybCoffeeProductData', () => {
  it('should extract product data correctly', async () => {

    const productData = await getHAYBProductData();

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