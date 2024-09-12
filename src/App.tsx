import { useEffect, useState } from "react";
import {
  addProductToBasket,
  BasketItem,
  getBasket,
  getProducts,
  Product,
  removeProductFromBasket,
} from "./api/index";

import "./styles.css";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const makeSetPageNumber = (page: number) => (_e: React.MouseEvent) => {
    setPageNumber(page);
  };

  const makeHandleBasketAdd = (product: Product) => (_e: React.MouseEvent) => {
    addProductToBasket(product).then((basketResponse) => {
      setBasketItems(basketResponse.items);
    });
  };

  const makeHandleBasketRemove =
    (product: Product) => (_e: React.MouseEvent) => {
      removeProductFromBasket(product).then((basketResponse) => {
        setBasketItems(basketResponse.items);
      });
    };

  useEffect(() => {
    getProducts(pageNumber).then((productsResponse) => {
      setProducts(productsResponse.products);
      setTotalPages(productsResponse.totalPages)
    });
  }, [pageNumber]);

  useEffect(() => {
    getBasket().then((basketResponse) => {
      setBasketItems(basketResponse.items);
    });
  }, []);

  return (
    <div className="App columns">
      <section className="products">
        <h1>Products</h1>
        <h2>Look at our great products for sale!</h2>
        {products.map((product) => (
          <div id={product.uid} className="product">
            <h3 className="product-title">{product.title}</h3>
            <div className="product-price">£{(product.price / 100).toFixed(2)}</div>
            <button onClick={makeHandleBasketAdd(product)}>
              Add to basket
            </button>
          </div>
        ))}
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_item, i) => {
            return (
              <button id={`${i + 1}`} onClick={makeSetPageNumber(i + 1)}>
                {i + 1}
              </button>
            );
          })}
        </div>
      </section>
      <section className="basket">
        <h1>Basket</h1>
        <h2>Here are the products in your basket</h2>
        {basketItems.map(({ product, count }) => (
          <div id={product.uid} className="basketItem">
            <h3 className="basketItem-title">
              {product.title} ({count})
            </h3>
            <div className="basketItem-price">
              £{((product.price * count) / 100).toFixed(2)}
            </div>
            <button onClick={makeHandleBasketRemove(product)}>
              Remove from basket
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
