import React, { useEffect, useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({ product, addtoCart = true, removeFromCart = false, setReload = f => f, reload = undefined }) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDescription = product ? product.description
    : "Default description";
  const cardPrice = product ? product.price : "10";

const addToCart = () => {
  addItemToCart(product, () => setRedirect(true));
};

const getARedirect = redirect => {
  if (redirect) {
    return <Redirect to="/" />;
  }
};

const showAddToCart = addtoCart => {
  return (
    addtoCart && (
      <button
        onClick={addToCart}
        className="btn btn-block btn-outline-success mt-2 mb-2"
      >
        Add to Cart
      </button>
    )
  );
};

const showRemoveFromCart = removeFromCart => {
  return (
    removeFromCart && (
      <button
        onClick={() => {
          removeItemFromCart(product._id);
          setReload(!reload);
        }}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
    )
  );
};
return (
  <div className="card text-white text-center bg-dark border-info border-5 ">
    <div className="card-header pb-0"><h5>{cardTitle}</h5></div>
    <div className="card-body">
      {getARedirect(redirect)}
      <ImageHelper product={product} />
      <p className="lead bg-success font-weight-normal text-wrap ">
        {cardDescription}
      </p>
      <p className="btn btn-success rounded btn-sm px-5 mb-0">₹ {cardPrice}</p>
      <div className="row ">
        <div className="col-12">{showAddToCart(addtoCart)}</div>
        <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
      </div>
    </div>
  </div>
);
};

export default Card;
