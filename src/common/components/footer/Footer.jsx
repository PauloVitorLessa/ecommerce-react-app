import { Outlet, Link, useLocation } from "react-router-dom";
import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <>
      <div class="footer-dark">
        <footer>
          <div class="footerContainer container-md">
            <div class="row">
              <div class="col-sm-6 col-md-3 item"></div>
              <div class="col-sm-6 col-md-3 item"></div>
              <div class="col-md-6 item text"></div>
              <div class="col item social">
                <a href="#">
                  <i class="icon ion-social-facebook"></i>
                </a>
                <a href="#">
                  <i class="icon ion-social-twitter"></i>
                </a>
                <a href="#">
                  <i class="icon ion-social-snapchat"></i>
                </a>
                <a href="#">
                  <i class="icon ion-social-instagram"></i>
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
