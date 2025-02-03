export interface Product {
  _id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string; // Optional, if some products might not have currency
}