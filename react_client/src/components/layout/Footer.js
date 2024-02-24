import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-light">
      <h4 className="text-center text-secondary">All Right Reserved &copy; Himanshu Vaidya</h4>
      <p className="text-center mt-3">
        <Link to="/">About</Link> | <Link to="/">Contact</Link> | <Link to="/">Privacy Policy</Link>
      </p>
    </div>
  );
}

export default Footer;

