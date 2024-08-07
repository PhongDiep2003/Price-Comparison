import axios from "axios"; 
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice, extractDecimalPrice} from "../utils";

export async function scrapeAmazonProduct(url: string): Promise<any> {
  const username = process.env.BRIGHT_USERNAME || ""
  const password = process.env.BRIGHT_PASSWORD || ""
  const port = 22225;

  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: process.env.HOST  || "" ,
    port,
    rejectUnauthorized: false,
  }
   try {
    const response = await axios.get(url, options)
    const $ = cheerio.load(response.data)
    const title = $("#productTitle").text().trim();
    const currentWholePrice = extractPrice(
      $('.priceToPay span.a-price-whole').first(),
      $('.a-price-whole').first(),
      $('#a-offscreen').first(),
      $('.a.size.base.a-color-price').first(),
      $('.a-button-selected .a-color-base').first(),
    ) + '.' + extractDecimalPrice($('.a-price-fraction').first());

    const currency = extractCurrency($('.a-price-symbol').first());
   
    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    const image = $('#landingImage').attr('src') || $('#imgBlkFront').attr('src');
    const data = {
      title,
      currentWholePrice,
      currency,
      outOfStock,
      image,
    }
    return data
  
   } catch(error: any) {
      console.log("Error scraping Amazon product", error.message)
      throw new Error("Error scraping Amazon product. Please try again")
   }
}

export async function scrapeEbayProduct(keyword: string) {
  try {
    const url = "https://api.brightdata.com/dca/trigger_immediate?collector=c_lzg5zisf138x425a5o"
    const token = process.env.TOKEN || ""
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    const defaultCount = 1
    const body =  JSON.stringify({
      keyword: keyword,
      count: defaultCount
    })
    const response = await axios.post(url, body, {headers})
    const {response_id} = response.data
    if (!response_id) {
      console.log('No response id found')
      throw new Error("Error in scraping Ebay product. Please try again")
    }
    // fetch data from collection id
    const responseIdURL = `https://api.brightdata.com/dca/get_result?response_id=${response_id}`
    let processedResponse = await axios.get(responseIdURL, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    let maximumRetries = 4
    while (processedResponse.data.pending) {
      console.log('Request is still pending. Checking again in 15 seconds...');
      await new Promise(resolve => setTimeout(resolve, 15000));

      processedResponse = await axios.get(responseIdURL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      maximumRetries--;
      if (maximumRetries === 0) {
        console.log('Maximum retries reached')
        return {}
      }
    }

    const data = processedResponse.data
    return data[0]

  } catch(error: any) {
    throw new Error(error.message)
  }
}