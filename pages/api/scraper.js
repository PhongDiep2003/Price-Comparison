import {scrapeProducts} from '../../lib/actions/index.tsx'

export default async function scraper(req, res) {
  try {
    const {url, searchName} = req.query;
    const products = await scrapeProducts(url, searchName);
    res.status(200).json(products)
  } catch (error) {
    res.status(404).json({"message": `please try again: ${err}`})
  }
}