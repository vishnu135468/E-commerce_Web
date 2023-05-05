import React, { useState } from "react";
import Base from "../core/Base"
import { Redirect} from "react-router-dom"
import { signin, authenticate, isAuthenticated } from "../auth/helper"

const Signin = () => {

    //use states hooks 
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRediret: false
    })

    const { email, password, error, loading, didRediret } = values;

    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: false, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            email:"",
                            password:"",
                            didRediret: true
                        })
                    })
                }
            })
            .catch(console.log("signin request failed"))
    }

    //-------------------------------
    const performRedirect = () => {
      
        if (didRediret) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    }
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light" >Email</label>
                            <input onChange={handleChange("email")} value={email} className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light" >Password</label>
                            <input onChange={handleChange("password")} className="form-control" type="password" value={password}/>
                        </div>
                        <button onClick={onSubmit} type="submit" className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Base title="Sign In Page" description="A PAGE FOR USER SIGN-IN">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signin; 