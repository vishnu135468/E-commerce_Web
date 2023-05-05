import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4 text-capitalize font-weight-bold ",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid bg-black mb-0">
      <div className="jumbotron text-white text-center bg-dark mx-n2 mb-0 pt-n3 font-weight-bold">
        <h2 className=" text-white my-0 display-4"><strong>{title}</strong></h2>
        <p className="lead text-white mb-0"><i>{description}</i></p>

      </div>
      <div className={className}>{children}</div>
    </div>

    <footer className="footer mt-3 py-3 position-static bg-black">
      <div className="container-xl bg-success text-white py-2 text-center">
        <h5 className="d-inline  text-black"> If you got any question, feel free to reach out!!!</h5>
        <a className="btn btn-warning text-success ml-5 " href="https://wa.me/+91-0707-777-777"><strong>Contact Us</strong></a>
      </div>
    </footer>
      {/* <div className="container">
        <span className="text-muted">
          An amazing <span className="text-white"> MERN </span> bootcamp
        </span>
      </div> */}
      
  </div>
);

export default Base;
