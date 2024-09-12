import type { ProductsApiResponse, BasketApiResponse, Product } from "./types";
import { productFactory } from "./factory";

export * from "./types";

const totalProducts = 85;
const products = productFactory.buildList(totalProducts);
const perPage = 10;

export const getProducts = async (
  page: number
): Promise<ProductsApiResponse> => {
  console.log("getProducts");
  await imitateServerDelay();
  const startIndex = page * perPage - 1;
  return {
    products: products.slice(startIndex, startIndex + perPage),
    totalResults: products.length,
    totalPages: Math.floor(totalProducts / perPage),
  };
};

const BasketDb = new Map<string, { product: Product; count: number }>();

export const getBasket = async (): Promise<BasketApiResponse> => {
  console.log("getBasket");
  await imitateServerDelay();
  return { items: Array.from(BasketDb.values()) };
};

export const addProductToBasket = async (product: Product) => {
  console.log("addProductToBasket");
  if (BasketDb.has(product.uid)) {
    const basketItem = BasketDb.get(product.uid)!;
    BasketDb.set(product.uid, {
      product: basketItem.product,
      count: basketItem.count + 1,
    });
  } else {
    BasketDb.set(product.uid, { count: 1, product });
  }

  await imitateServerDelay();
  return { items: Array.from(BasketDb.values()) };
};

export const removeProductFromBasket = async (product: Product) => {
  console.log("removeProductFromBasket");
  if (BasketDb.has(product.uid)) {
    const basketItem = BasketDb.get(product.uid)!;

    if (basketItem.count > 1) {
      BasketDb.set(product.uid, {
        product: basketItem.product,
        count: basketItem.count - 1,
      });
    } else {
      BasketDb.delete(product.uid);
    }
  }

  await imitateServerDelay();
  return { items: Array.from(BasketDb.values()) };
};

const imitateServerDelay = () => {
  const delay = Math.random() * 1000;

  return new Promise<void>((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};
