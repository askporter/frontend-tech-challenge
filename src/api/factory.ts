import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import type { Product } from "./types";

export const productFactory = Factory.define<Product>(() => {
  return {
    uid: faker.string.uuid(),
    sku: faker.string.alphanumeric(6),
    price: faker.number.int({ min: 100, max: 10_000 }),
    title: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
  };
});
