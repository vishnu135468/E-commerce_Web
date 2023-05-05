import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories,createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";


//addProduct is used to add the product
const AddProduct = () => {

//isAuthenticated is used to check whether the user is authenticated or not
const {user,token}=isAuthenticated();

//useState is used to set the values
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  //destructuring the values
  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;
//preload function is used to get the categories from the backend
  const preload = () => {
    getCategories().then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        console.log("CATE:",categories);
      }
    });
  };
  //useEffect is used to call the preload function
  useEffect(() => {
    preload();
  }, []);

  //handleChange is used to handle the changes in the form
  const handleChange = name =>  event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    console.log("value:",value);
    //formData is used to set the values
    formData.set(name, value);
    setValues({ ...values, [name]: value }); //...values is used to get the previous values
  };

  //onSubmit is used to submit the form
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    //createProduct is used to create the product
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        //error is used to show the error
        setValues({ ...values, error: data.error });
      } else {
        //setValues is used to set the values
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  //successMessage is used to show the success message
  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }} //if createdProduct is true then show the message
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  //createProductForm is used to create the form  
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {/* //map is used to iterate the categories */}
          {categories &&
            categories.map((cate, index) => ( 
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );
  
  //return is used to return the values
    return (
    <Base
      title="Add a Product here"
      description="Welcome to Product Creation Section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded mx-1">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {loading && (
            <div className="alert alert-info">
              <h2>Loading...</h2>
            </div>
          )}
        
          {createProductForm()}</div>
      </div>
    </Base>
  );
};
export default AddProduct;
