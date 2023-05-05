import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./helper/StripeCheckout";

const Cart = () => {
  //useState
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  //loadCart
  const loadAllProducts = () => {
    return (
      <>
       
      <div className="row">
        
        {products.map((product, index) => {
          console.log(product)
          return (
            <div className="col-4 mb-4">
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
            </div>
          );
        })}
      </div>
      </>
    );
  };
  //create loadChekcout method
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );

  };

  return (
    <Base title="Cart Page" description="Ready to Purchase">
      <div className="row">

      <h2 className="py-3 d-flex flex-wrap align-items-center">Your Products</h2>

          <div className=" offset-md-8 col-2">
            <StripeCheckout
            products={products}
            setReload={setReload}
            />
            </div>
        {/* //create a div for showing products in grid */}
          <div className="row">{products.length > 0 ? loadAllProducts() : (<h3>No Products in Cart</h3>)}</div>
      </div>

    </Base>
  );
};

export default Cart;
