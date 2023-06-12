import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { P, Container } from "./style";
import { getSession } from "../../../services/sessionStorage";

const clearSession = () => {
  sessionStorage.removeItem("user");
};

class NavBar extends React.Component {
  render() {
    return (
      <>
        <Container>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-md">
              <Link to={"/"} className="navbar-brand">
                E-commerce
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link active">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                      link
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link active">
                      link
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link active">
                      link
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link active">
                      link
                    </Link>
                  </li>
                </ul>

                {(() => {
                  //Renderiza se não tiver usuário logado
                  if (sessionStorage.getItem("user") == null) {
                    return (
                      <Link to="/login">
                        <P>Login</P>
                      </Link>
                    );
                    //Renderiza se o usuário logado for Administrador
                  } else if (getSession("user").roles[0] === "ROLE_ADMIN") {
                    return (
                      <>
                        <div className="nav-item dropdown conta">
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Conta
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <Link
                                to={"/regProd"}
                                className="dropdown-item"
                                href="/#"
                              >
                                Cadastrar Produtos
                              </Link>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/#">
                                Atualizar Produtos
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/#">
                                Remover Produtos
                              </a>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={clearSession}
                                href="/"
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                        <P>
                          Bem vindo{"(" + "a" + ")"}, {getSession("user").nome}
                        </P>
                      </>
                    );
                    //Renderiza se o usuário não for administrador
                  } else {
                    return (
                      <>
                        <div className="nav-item dropdown conta">
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Conta
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="/#">
                                Atualizar Dados
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/#">
                                Meus Pedidos
                              </a>
                            </li>
                            <li>
                              <Link
                                to={"/Cart"}
                                className="dropdown-item"
                                href="/#"
                              >
                                Meu Carrinho
                              </Link>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={clearSession}
                                href="/"
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                        <P>
                          Bem vindo{"(" + "a" + ")"}, {getSession("user").nome}
                        </P>
                      </>
                    );
                  }
                })()}

                {/* {sessionStorage.getItem("user") == null ? (
                  <Link to="/login">
                    <P>Login</P>
                  </Link>
                ) : (

                  
                  <>
                    <div className="nav-item dropdown conta">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Conta
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="/#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/#">
                            Another action
                          </a>
                        </li>
                        <li className="dropdown-divider"></li>
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={clearSession}
                            href="/"
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                    <P>Bem vindo, {getSession("user").nome}</P>
                  </>
                )} */}
                {/* <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                ></input>
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form> */}
              </div>
            </div>
          </nav>
        </Container>
        <Outlet />
      </>
    );
  }
}

export default NavBar;
