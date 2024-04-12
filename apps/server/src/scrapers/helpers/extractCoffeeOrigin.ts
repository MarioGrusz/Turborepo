type OriginMap = {
    [key: string]: string;
};


const originMap: OriginMap = {
    "kenia": "kenya",
    "etiopia": "ethiopia",
    "etiopía": "ethiopia",
    "brasil" : "brazil",
    "fourquet": "fourquet blend",
    "ruanda": "rwanda",
    "méxico" : "mexico",
    "panamá" : "panama",
    "Coffee pods - Decaf " : 'coffee pods',
};
  
const extractCoffeeOrigin = (productName: string): string => {
    const standardizedProductName = productName.toLowerCase();
    const words = standardizedProductName.split(' ');
    let origin : string;
    
    // Look for the origin name in the product name
    if (words.includes('el') && words.includes('salvador')) {
      origin = 'el salvador';
    } else if (words.includes('costa') && words.includes('rica')) {
      origin = 'costa rica';
    } else {
      origin = words[0];
    }
    
    // Map any variations of the origin name to a standardized name
    if (originMap[origin]) {
      origin = originMap[origin];
    }
    
    return origin.toLowerCase();
};

export default extractCoffeeOrigin;

//New version of this function:

// type OriginMap = {
//     [key: string]: string;
//    };
   
//    const originMap: OriginMap = {
//     "kenia": "kenya",
//     "etiopia": "ethiopia",
//     "etiopía": "ethiopia",
//     "brasil": "brazil",
//     "fourquet": "fourquet blend",
//     "ruanda": "rwanda",
//     "méxico": "mexico",
//     "panamá": "panama",
//     "Coffee pods - Decaf": "coffee pods",
//    };
   
//    const extractCoffeeOrigin = (productName: string): string => {
//     const standardizedProductName = productName.toLowerCase();
//     const words = standardizedProductName.split(' ');
   
//     // Function to check if the product name contains specific words
//     const containsWords = (...wordsToCheck: string[]): boolean =>
//        wordsToCheck.every(word => words.includes(word));
   
//     // Determine the origin based on specific conditions
//     const origin = containsWords('el', 'salvador') ? 'el salvador' :
//                    containsWords('costa', 'rica') ? 'costa rica' :
//                    words[0];
   
//     // Map any variations of the origin name to a standardized name
//     return originMap[origin] || origin.toLowerCase();
//    };
   
//    export default extractCoffeeOrigin;
   