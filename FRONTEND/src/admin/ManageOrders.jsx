import React, { useState } from 'react'
import Base from "../core/Base"
import { updateOrderStatus, getOrders } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { useEffect } from 'react';


const ManageOrders = () => {

    const { userId } = isAuthenticated() && isAuthenticated().user._id;
    const { token } = isAuthenticated() && isAuthenticated().token;

    //useState
    const [orders, setOrders] = useState([]);

    const dateTimeFormatter = Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });


    //useEffect
    // const preload = () => {
    //     getOrders().then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             setOrders(data);
    //         }
    //     })
    // }

    // useEffect
    useEffect(() => {
        // generate order with crypto random id, dummy user name email and total 
        const generateOrder = () => {
            const orders = [];
            for (let i = 0; i < 4; i++) {
                const order = {
                    _id: "ORD" + Math.floor(Math.random() * 1000000000),
                    status: "Received",
                    amount: 1000,
                    address: "D-2/5, Block-D, Vasant Kunj, New Delhi",
                    updated: dateTimeFormatter.format(new Date() - Math.floor(Math.random() * 1000000000)),
                        user: {
                            _id: Math.random().toString(36).substr(2, 9),
                                name: ["John", "Doe", "Jane", "Doe"][Math.floor(Math.random() * 4)],
                    }
        }
        orders.push(order);
    }
            return orders;
}
setOrders(generateOrder());
    }, [])





return (
    <Base
        title='Manage Orders'
        description='Orders can be managed here'
    >
        <div className="container-fluid">
            <h2 className="text-center text-white my-3">Total Orders : {orders?.length}</h2>
            <table className='w-100 bg-success text-center'>
                <thead className='btn-secondary'>
                    <tr>
                        <th className="text-white">Order ID</th>
                        <th className="text-white">Status</th>
                        <th className="text-white">Amount</th>
                        <th className="text-white">Address</th>
                        <th className="text-white">Updated</th>
                        <th className="text-white">User</th>
                        <th className="text-white">Update Status</th>
                        <th className="text-white">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length > 0 && orders.map((order, index) => {
                        return (
                            <tr key={index} className="text-center mb-2 ">
                                <td className="text-white">{order._id}</td>
                                <td className="text-white">{order.status}</td>
                                <td className="text-white">₹{order.amount}</td>
                                <td className="text-white">{order.address}</td>
                                <td className="text-white">{order.updated}</td>
                                <td className="text-white">{order.user.name}</td>
                                <td className="text-white">
                                    <select className="form-control bg-warning" onChange={(e) => { updateOrderStatus(order._id, e.target.value) }}>
                                        <option value="Received">Received</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                {/* update btn */}
                                <td className="text-white bg-info">
                                    <button className="btn btn-info btn-block"
                                        onClick={() => {
                                            // show dummy alert after 1.5 sec 
                                            setTimeout(() => {
                                                alert("Order Updated");
                                            }
                                                , 1500);
                                        }}
                                    ><h5>Update</h5></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* no orders */}
                {orders?.length === 0 && (
                    <h5 className="text-white">No Orders</h5>
                )}
            </table>
        </div>
    </Base>
)}

export default ManageOrders;

