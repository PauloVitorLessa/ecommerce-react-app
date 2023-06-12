import { Outlet, Link, useLocation } from "react-router-dom";
import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <>
      <div className="footer-dark">
        <footer>
          <div className="footerContainer container-md">
            <div className="row">
              <div className="col-sm-6 col-md-3 item"></div>
              <div className="col-sm-6 col-md-3 item"></div>
              <div className="col-md-6 item text"></div>
              <div className="col item social">
                <a href="#">
                  <i className="icon ion-social-facebook"></i>
                </a>
                <a href="#">
                  <i className="icon ion-social-twitter"></i>
                </a>
                <a href="#">
                  <i className="icon ion-social-snapchat"></i>
                </a>
                <a href="#">
                  <i className="icon ion-social-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <Outlet />
    </>
  );
};

export default Footer;
