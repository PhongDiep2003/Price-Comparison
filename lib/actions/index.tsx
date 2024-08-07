"use server"
import { scrapeAmazonProduct, scrapeEbayProduct } from "../scraper"
import {v4 as uuidv4} from 'uuid'

export async function scrapeProducts(url: string, name?: string){
    const amazonProduct = await scrapeAmazonProduct(url)
    const ebayProduct = await scrapeEbayProduct(name || amazonProduct.title)
    const uuid: string = uuidv4()
    const amazonProductPrice = amazonProduct?.currentWholePrice 
                                                        ? amazonProduct.currency + amazonProduct.currentWholePrice 
                                                        : 'Price is not found'
    const ebayProductPrice = ebayProduct?.price?.value
                                                        ? String(ebayProduct.price.symbol + ebayProduct.price.value)
                                                        : 'Price is not found';
    const products = [
      {
        id: uuid,
        type: "amazon",
        title: amazonProduct?.title || "Not Found",
        price: amazonProductPrice,
        image: amazonProduct?.image || '/not_found.jpg',
        product_url: url || '/not-found'
      },
      {
        id: uuid,
        type: "ebay",
        title: ebayProduct?.title || "Not Found",
        price: ebayProductPrice,
        image: ebayProduct?.image || '/not_found.jpg',
        product_url: ebayProduct?.product_url || '/not-found'
      }
    ]
    return products
}