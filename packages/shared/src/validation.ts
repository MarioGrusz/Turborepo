import { z } from 'zod';

const productSchema = z.object({
  shopName: z.string(),
  productName: z.string(),
  productOrigin: z.string(),
  productPrice: z.string().transform(str => parseFloat(str)),
  productImage: z.string().url(),
  productLink: z.string().url(),
  new: z.boolean().optional(), 
});


type ProductData = z.infer<typeof productSchema>;


function validateProductData (input: unknown) {
  return productSchema.safeParse(input)
}
  
  
function validatePartialProductData (input: unknown) {
  return productSchema.partial().safeParse(input)
}