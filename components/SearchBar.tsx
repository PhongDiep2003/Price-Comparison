"use client"
import React, {useState} from 'react'
import { scrapeProducts } from '@/lib/actions'
import useStorage from '@/storage/storage'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

type Product = {
  id: string,
  type: string,
  title: string,
  price: string,
  image: string,
  product_url: string
}

const SearchBar = () => {
  const [searchParam, setSearchParam] = useState('')
  const [productName, setProductName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { populateStorage } = useStorage() as {populateStorage: (products: [Product] | any) => void}
  const router = useRouter()

  const successAlert = () => {
    toast.success('Success', {
      position: 'top-left',
      autoClose: 5000,
      closeOnClick: true,
    })
  }

  const errorAlert = (message: string) => {
    toast.error(`Error. ${message}`, {
      position: 'top-left',
      autoClose: 5000,
      closeOnClick: true
    })
  }

  const isValidAmazonUrl = (url: string) => {
    try{
      const newUrl = new URL(url)
      console.log(newUrl.hostname)
      if (newUrl.hostname.includes('amazon.') || 
          newUrl.hostname.includes('www.amazon') ||
          newUrl.hostname.includes('amazon.com')) {
        return true
      }
      return false
    }
    catch(e) {
      return false
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isValidAmazonUrl(searchParam)) return alert('Please enter a valid Amazon product url')
    try {
      setIsLoading(true)
      const products = await scrapeProducts(searchParam, productName)
      
      if (products) {
        populateStorage(products)
        successAlert()
        router.push(`/${products[0].id}`)
      }

    } catch(e:any) {
      errorAlert(e.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <form 
          className='flex flex-wrap gap-4 mt-12'
          onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 w-[80%]'>
            <input
              type='text'
              placeholder='Enter the product url on Amazon'
              className='searchbar-input'
              onChange = {(e) => setSearchParam(e.target.value)}
              disabled={isLoading}
            />
            <p className='font-bold text-sm'><span className='text-primary'>Optional: </span>If the product isn't found on eBay using just the Amazon URL, try including the product name</p>
            <input
              type='text'
              placeholder='Enter the product name (optional)'
              className='searchbar-input'
              onChange={(e) => setProductName(e.target.value)}
              disabled={isLoading}
            />

          </div>
          <button
            type='submit'
            className='searchbar-btn'
            onSubmit={handleSubmit}
            disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
      </form>
      {isLoading && <p className='mt-3 color-[#232f3e]'>This might take up to a minute!</p>}
    </>
  )
}

export default SearchBar
