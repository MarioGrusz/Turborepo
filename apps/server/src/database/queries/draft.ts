import runScrapingFunctions from '../../scrapers/scrapeFirstDataBatch.js';
import { ProductData } from 'shared'
import { pool } from '../connection.js';





//POSTGRES: do next steps, filtering data
 
const insertCoffeeData = async (data: ProductData[]) => {

    try {
  
      const newCoffeeData = await runScrapingFunctions();
      const oldCoffeeData = await pool.query('SELECT * FROM coffee_products');
  
      if(!oldCoffeeData && newCoffeeData) {
        await insertDataToEmptyTable(newCoffeeData)
      } else if (oldCoffeeData && newCoffeeData) {
        
        const newCoffeeDataToInsert = newCoffeeData.filter(newCoffee => 
          !oldCoffeeData.rows.some(oldCoffee => oldCoffee.product_link === newCoffee.productLink)
      );
  
      }
  
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "An error occurred while inserting data." }),
      };
    }
  
  
  }
  
  const insertDataToEmptyTable = async (data: ProductData[]) => {
    // Reset the sequence to start from 1
    await pool.query('ALTER SEQUENCE coffee_products_id_seq RESTART WITH 1');
  
    for (const item of data) {
      try {
        const res = await pool.query(
          'INSERT INTO coffee_products (shop_name, product_name, product_origin, product_price, product_image, product_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [item.shopName, item.productName, item.productOrigin, item.productPrice, item.productImage, item.productLink]
        );
        console.log('Inserted row:', res.rows[0]);
      } catch (error) {
          console.error('Error inserting data:', error);
      }
    }
  }
  
    
  
  // const scrapedData = await runScrapingFunctions();
  // await insertData(scrapedData);