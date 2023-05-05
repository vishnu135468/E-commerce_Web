import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { createProduct, getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";



const UpdateCategory = ({match}) => {

//isAuthenticated is used to check whether the user is authenticated or not
const {user,token}=isAuthenticated();

//useState is used to set the values
const[values,setValues]=useState({
    name:"",
    error:"",
    success:false
});

//destructuring the values
const{name,error,success}=values;

//preload function is used to get the categories from the backend
const preload=(categoryId)=>{
    getCategory(categoryId).then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }
        else{
            setValues({...values,name:data.name})
        }
    })
}
  //useEffect is used to call the preload function 
    useEffect(() => {
        preload(match.params.categoryId); //match.params.categoryId is used to get the categoryId from the url
    }, []);

 

  
  //onSubmit is used to submit the form
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:"",success:false});
        //backend request fired
        updateCategory(match.params.categoryId,user._id, token, { name }).then((data) => {
            if (data.error) {
                setValues({...values,error:data.error,success:false})
            } else {
                setValues({...values,name:"",error:"",success:true})
            }
            
        });
    };

    //handleChange is used to handle the changes in the form
    const handleChange = (event) => {
        setValues({...values,name:event.target.value,error:"",success:false})
    };

 
  //successMessage is used to show the success message
    const successMessage=()=>{
        if(success){
            return <h4 className="text-success">Category updated successfully</h4>
        }
    }
    //warningMessage is used to show the warning message
    const warningMessage=()=>{
        if(error){
            return <h4 className="text-success">Failed to update category</h4>
        }
    }


 
  //createCategoryForm is used to create the form  
    const createCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input
                    type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. Summer"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
    );

 
  //return is used to return the values
    return (
        <Base>
            <div className="container bg-info p-4">
                <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
                {/* <Link to="/admin/categories" className="btn btn-md btn-dark mb-3 px-1">Back to Categories</Link> */}
                <div className="row bg-dark text-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {successMessage()}
                        {warningMessage()}
                        {createCategoryForm()}
                    </div>
                </div>
            </div>
        </Base>

  );
    }

export default UpdateCategory;