import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../../backend";
import { createOrder } from "./orderHelper";
import { cartEmpty } from "./cartHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
   return products.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
    }, 0);
    };

    //making payment
    const makePayment = token => {
        const body = {
            token,
            products
        };
        const headers = {
            "Content-Type": "application/json"
        };

        return fetch(`${API}/payment/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(response => {
            console.log(response)
            //call further methods
            const {status} = response;
            console.log("STATUS", status)
            cartEmpty(()=>{
              console.log("did we got a crash")
            });

            //set Reload
            setReload(!reload)
        })
        .catch(error => console.log(error));
    };

    //show stripe button
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51N3ewlSJTbl0LG6nwJNgC6gpX7wVt5LRr88HkpkOs8Jg6KMpIkRImWji8XG4GSRGWGoeAhXoYARZbFZpsuMNyzq800i4nnHivD"
            token={makePayment}
            amount={getFinalPrice() * 100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress            
            >            
                <button className="btn btn-success btn-block">BUY</button>
            </StripeCheckoutButton>

            ) : (
            <Link to="/signin">
                <button className="btn btn-warning btn-block">Signin</button>
            </Link>
        );
    };


  return (
    <div className="border-bottom-green">
      <h4 className="text-white"><i>Total Price :   </i> &nbsp; ₹ {getFinalPrice()}   </h4>
      {showStripeButton()}
          

    </div>
  );
};

export default StripeCheckout;
