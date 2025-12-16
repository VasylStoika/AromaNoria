export type ProductType = 'EDP' | 'EDT' | 'Parfum';
export type Gender = 'Male' | 'Female' | 'Unisex';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  volume: number;
  type: ProductType;
  gender: Gender;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}