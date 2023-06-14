import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Shop from "./pages/shop/Shop.jsx";
import Payment from "./pages/payments/Payment.jsx";
import AllClientes from "./pages/AllClientes/AllClientes.jsx";
import Register from "./pages/Cadastro/Register.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import UpdateProduct from "./pages/updateProduct/UpdateProduct.jsx";
import DeleteProduct from "./pages/deleteProduct/DeleteProduct.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import PedidosClientes from "./pages/PedidosCliente/PedidosClientes.jsx";
import Footer from "./common/components/footer/Footer.jsx";
import RegisterProduct from "./pages/registerProduct/index.jsx";
import UpdateCliente from "./pages/updateCliente/UpdateCliente.jsx";
import NavBar from "./common/components/navBar/NavBar.jsx";
import { GlobalStyle } from "./common/style/GlobalStyle.js";
import "jquery";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={RegisterProduct} path="/regProd" />
        <Route Component={Login} path="/login" />
        <Route Component={Register} path="/register" />
        <Route Component={SignUp} path="/signup" />
        <Route Component={UpdateProduct} path="/updateProduct" />
        <Route Component={AboutUs} path="/aboutus" />
        <Route Component={PedidosClientes} path="/pedido" />
        <Route Component={Shop} path="/shop" />
        <Route Component={Payment} path="/payments" />
        <Route Component={UpdateCliente} path="/updateCliente" />
        <Route Component={DeleteProduct} path="/delprod" />
        <Route Component={AllClientes} path="/clientes" />
      </Routes>
      <Footer />
    </BrowserRouter>
    <GlobalStyle />
  </React.StrictMode>
);
