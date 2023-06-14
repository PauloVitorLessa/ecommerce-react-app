import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Modal from "react-bootstrap/Modal";
import { Api } from "../../services/api";

function Payment() {
  const [paid, setPaid] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [pedidoConcluido, setPedidoConcluido] = useState("");

  const calculateTotal = () => {
    let total = 0;

    const savedCartItems = sessionStorage.getItem("cartItems");
    if (savedCartItems) {
      const cartItems = JSON.parse(savedCartItems);

      if (cartItems.length > 0) {
        for (const item of cartItems) {
          const quantity = item.quantity || 1; //se nao tiver quantidade fica 1
          total += item.valorUnitario * quantity;
        }
      }
    }

    return total;
  };

  const product = {
    price: calculateTotal(),
  };

  const paypalOptions = {
    "client-id":
      "AUpdxl3_a0LpqFLg8qm8ZF5XyCIhVtxGMQ1nNYp5tJjxLJexV7gkZUoqfbon40nb97LGQ7WhbXJtIHiz",
    currency: "BRL",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "BRL",
            value: product.price,
          },
        },
      ],
    });
  };

  // const onApprove = (data, actions) => {
  //   return actions.order.capture().then((details) => {
  //     setPaid(true);
  //     console.log(details);
  //   });
  // };

  //------------------------------------------------------------------
  useEffect(() => {
    function getProductsFromSession() {
      const products = JSON.parse(sessionStorage.getItem("cartItems"));
      setProdutos(products);

      const cliente = JSON.parse(sessionStorage.getItem("user"));
      setCliente(cliente);
    }
    getProductsFromSession();
  }, []);

  //============================================================

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      setPaid(true);
      console.log(details);
      console.log("detalhes");

      const pedidoJson = {
        status: "aberto",
        cliente: {
          idCliente: cliente.id,
        },
      };

      Api.post("/pedidos", pedidoJson)
        .then((res) => {
          setPedido(res.data);
          produtos.forEach((prod, index) => {
            let itemPedidoJson;

            if (index + 1 == produtos.length) {
              itemPedidoJson = {
                quantidade: prod.quantity,
                percentualDesconto: 0,
                produto: {
                  idProduto: prod.idProduto,
                },
                pedido: {
                  idPedido: res.data.idPedido,
                },
                status: "fechado",
              };
            } else {
              itemPedidoJson = {
                quantidade: prod.quantity,
                percentualDesconto: 0,
                produto: {
                  idProduto: prod.idProduto,
                },
                pedido: {
                  idPedido: res.data.idPedido,
                },
                status: "aberto",
              };
            }

            Api.post("/itempedidos", itemPedidoJson)
              .then((res) => {
                if (res.data.status == "fechado") {
                  setPedidoConcluido(true);
                  setModalTitle("Sucesso");
                  setModalBody("Pedido Realizado");
                  setSmShow(true);
                }
              })
              .catch((err) => {
                console.log("erro na api itemPedidos");
                console.log(err);
                setModalTitle("Erro");
                setModalBody("Errou ao adicionar um produto no Pedido");
                setSmShow(true);
              });
          });
        })
        .catch((err) => {
          console.log("erro na api pedidos");
          console.log(err);
          setModalTitle("Erro");
          setModalBody("Errou ao Criar o Pedido");
          setSmShow(true);
        });
    });
  };

  //--------------------------------------------------------------
  return (
    <>
      <div className="Payment">
        {paid ? (
          <div>
            <h1>compra realizada</h1>
          </div>
        ) : (
          <>
            <h1>
              {product.description} por R${product.price}
            </h1>
            <PayPalScriptProvider options={paypalOptions}>
              <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
            </PayPalScriptProvider>
          </>
        )}
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
}

export default Payment;
