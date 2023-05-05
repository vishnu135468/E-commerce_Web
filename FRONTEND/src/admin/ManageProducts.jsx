import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deleteProduct, getProducts } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import { useEffect, useState } from "react";

const ManageProducts = () => {
  // useStates is used to set the values
  const [products, setProducts] = useState([]);
  // isAuthenticated is used to check whether the user is authenticated or not
  const { user, token } = isAuthenticated();

  // preload function is used to get the products from the backend
  const preload = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  //useEffect is used to call the preload function
  useEffect(() => {
    preload();
  }, []);

  //delete the product from the backend using the productId and token
  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        //preload function is called to get the products from the backend
        preload();
      }
    });
  };

  return (
    <Base title="Welcome Admin" description="Admin can Manage Products here"
    >
      {/* <h2 className="mb-4">All products:</h2> */}
      <Link className="btn btn-info m-3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      {/* <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3"> products: {products?.length}</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
      
        <h2 className="text-center text-white my-3 "> Products : {products?.length}</h2>
        <table className='w-100 text-center bg-success'>
          <thead className="btn-secondary">
            <tr className='my-0 text-white lead'>
              <th className="text-white">Product ID</th>
              <th className="text-white">Name</th>
              <th className="text-white">Price</th>
              <th className="text-white">Stock</th>
              <th className="text-white">Update</th>
              <th className="text-white">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 && products.map((product, index) => {
              return (
                <tr key={index} className="text-center mb-2 ">
                  <td className="text-white">{product._id}</td>
                  <td className="text-white">{product.name}</td>
                  <td className="text-white">{product.price}</td>
                  <td className="text-white">{product.stock}</td>
                  {/* update btn */}
                  <td className="text-white bg-info ">
                    <Link
                      className="btn btn-info btn-block btn-md my-2"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <h5 className="">Update</h5>
                    </Link>
                  </td>
                  {/* delete btn */}
                  <td className="text-white bg-danger">
                    <button className="btn btn-danger btn-block btn-md my-2"

                      onClick={() => {
                        deleteThisProduct(product._id);
                      }}
                    ><h5>Delete</h5></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          {/* no products */}
          {products?.length === 0 && (
            <h3 className="text-white">No Products</h3>
          )}
        </table>
       </Base>
  );
};

export default ManageProducts;

