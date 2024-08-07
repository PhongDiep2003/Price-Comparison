
export function extractPrice(...selectors: any) {
  for (const selector of selectors) {
    const priceText = selector.text().trim().replace(/[^\d.]/g, '')
    if (priceText) {
      if (priceText.slice(-1) === '.') {
        return priceText.slice(0, -1)
      }
      return priceText
    }
    
  }
  return ''
}

export function extractDecimalPrice(selector: any) {
  if (selector.text().trim()) {
    return selector.text().trim()
  }
  return '00'
}

export function extractCurrency(selector: any) {
  if (selector.text().trim()) {
    return selector.text().trim()
  }
  return ''
}