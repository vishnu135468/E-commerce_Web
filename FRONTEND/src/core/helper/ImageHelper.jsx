import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  // const productId = product?.product?._id
  //   ? product?.product._id
  //   : product?.product?.product?._id;
  // if (!productId) {
  //   console.log("No product id");
  // }
  const productId = product?._id ? product._id : product?.product?._id;
  const imageUrl = product
    ? `${API}/product/photo/${productId}`
    : `https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
        alt=""
      />
    </div>
  );
};

export default ImageHelper;
