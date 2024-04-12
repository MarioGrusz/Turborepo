import getHAYBProductData from "./scrapeHaybData.js";
import getTomaCoffeeProductData from "./scrapeTomaData.js";



const runScrapingFunctions = async () => {

  try {
    const tomaData = await getTomaCoffeeProductData();
    console.log('Toma Cafe scraping complete');

    const HAYBData = await getHAYBProductData();
    console.log('HAYB Coffee scraping complete');

    console.log('All scraping complete');
  
    const coffeeData = [...tomaData, ...HAYBData]; 
    console.log(coffeeData)
    return coffeeData;

  } catch (error) {
    console.error(error);
  }
};





export default runScrapingFunctions;