export type Product = {
  uid: string;
  sku: string;
  price: number;
  title: string;
};

export type ProductsApiResponse = {
  products: Product[];
  totalPages: number;
  totalResults: number;
};

export type BasketItem = {
  product: Product;
  count: number;
};

export type BasketApiResponse = {
  items: BasketItem[];
};
