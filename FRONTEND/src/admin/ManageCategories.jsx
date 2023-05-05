import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { isAuthenticated } from '../auth/helper/index'
import { deleteCategory, getCategories } from './helper/adminapicall'


const ManageCategories = () => {
//useState
    const [categories, setCategories] = useState([]);

    // isAuthenticated
const {user,token} = isAuthenticated();

//preload function
    const preload = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    };
    //useEffect
    useEffect(() => {
        preload();
    }, []);



    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    )

//delete category
    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        });
    };



    return(
        <Base title="Welcome Admin" description="Admin can Manage Categories here">
        {/* <h2 className="mb-4">All Categories:</h2> */}
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3"> Categories : {categories?.length}</h2>
  
            {/* product.map() is used to iterate through the products */}
            {/* { categories.map((category, index) => {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-white text-left">{category.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisCategory(category._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            
            })} */}
            <table className='w-100 text-center bg-success '>
                <thead className='bg-secondary'>
                    <tr className='my-0 text-white lead'>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.length > 0 && categories.map((category, index) => {
                        return (
                            <tr key={index} className="text-center mb-2 ">
                                <td className="text-white">{category._id}</td>
                                <td className="text-white">{category.name}</td>
                                {/* update btn */}
                                <td className="text-white bg-info">
                                    <Link
                                        className="btn btn-info btn-block btn-md my-2"
                                        to={`/admin/category/update/${category._id}`} 
                                    >
                                        <h5 className="">Update</h5>
                                    </Link>
                                </td>
                                {/* delete btn */}
                                <td className="text-white bg-danger ">
                                    <button className="btn btn-danger btn-block"
                                        onClick={() => {
                                            deleteThisCategory(category._id);
                                        }}
                                    ><h5>Delete</h5></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* no orders */}
                {categories?.length === 0 && (
                    <h3 className="text-white">No Categories</h3>
                )}
            </table>
                  

      
          </div>
        </div>
      </Base>
    )
}

export default ManageCategories;