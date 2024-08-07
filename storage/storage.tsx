import {create} from 'zustand';

//Define type for stored product
type Product = {
  id: string,
  type: string,
  title: string,
  price: string,
  image: string,
  product_url: string
}

// Define types for the state
type StorageType = {
  products: Product[] | null | undefined,
  populateStorage: (products: [Product]) => void,
}

const useStorage = create<StorageType>((set) => ({
  products: [],
  populateStorage: (products:[Product] | null | undefined) => set({products}),
}))

export default useStorage;