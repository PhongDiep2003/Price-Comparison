'use client'
import React from 'react'
import Image from 'next/image'
import useStorage from '@/storage/storage';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
type Product = {
  id: string,
  type: string,
  title: string,
  price: string,
  image: string,
  product_url: string
}

export default function ListingPage() {
  const { products } = useStorage() as { products: Product[] };
  const router = useRouter()
  if (products.length === 0 || !products) {
    router.push('/')
    return <div>Loading...</div>
  }
  return (
    <div className='product-container'>
        <div
            className='product-image'>
            <Image 
                  src={products[0].image} 
                  alt={products[0].title}
                  width={580}
                  height={500}
                  className='mx-auto object-contain' />
        </div>
        <div className='flex flex-col gap-10 xl:w-[30%]  w-96 mx-auto '>
          <Link href={products[0].product_url} target='_blank'>
            <div className='xl:w-full  border border-[#232f3e] bg-[#f4ae01] py-5 px-3 rounded-[15px] shadow-lg drop-shadow-sm flex flex-row gap-2 max-h-24 overflow-hidden hover:scale-105 transition ease-in-out duration-300 hover:overflow-y-auto hover:bg-[#ff9900] xl:mt-0 mt-10' >
              <Image src={'/amazon_icon.webp'} alt='amazon logo' width={50} height={50} className='rounded-full my-auto'/>
              <div className='my-auto'>
                <article className='text-balance'>
                  <h3>{products[0].title}</h3>
                  <p className='text-primary font-bold'>{products[0].price}</p>
                </article>
              </div>
            </div>
          </Link>
          <Link href={products[1].product_url} target='_blank'>
            <div className='xl:w-full border border-[#232f3e] bg-[#f4ae01] py-5 px-3 rounded-[15px] shadow-lg drop-shadow-sm flex flex-row gap-2 max-h-24 overflow-hidden hover:scale-105 transition ease-in-out duration-300 hover:overflow-y-auto hover:bg-[#88b719]' >
              <Image src={'/ebay.jpg'} alt='ebay logo' width={50} height={50} className='rounded-full my-auto'/>
              <div className='my-auto'>
                <article className='text-balance'>
                  <h3>{products[1].title}</h3>
                  <p className='text-primary font-bold'>{products[1].price}</p>
                </article>
              </div>
            </div>
          </Link> 
          <Link href={'/'}>
            <div className='text-center py-4 border rounded-10 bg-[#f4ae01] ml-auto shadow-lg drop-shadow-sm border-[#232f3e] hover:scale-105 transition ease-in-out duration-300 w-[30%]  '>
              Cancel
            </div>
          </Link>  
        </div>
      
      
    </div>
  )
}