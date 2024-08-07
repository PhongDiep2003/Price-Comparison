import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='w-full pl-20'>
      <Link href={'/'}>
        <p className='font-bold text-2xl mt-4 cursor-pointer'>Price<span className='text-primary-orange'>Comparison</span></p>
      </Link>
    </div>
  )
}

export default Navbar
