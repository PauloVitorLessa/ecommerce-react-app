// Fazer a requizição para a API p/ ter acesso aos pedidos
//   Armazenar em um array
// Filtrar pelo id do cliente logado
// Exibir em tela os pedidos daquele cliente
//   Seguindo o padrão do Figma

import { useEffect, useState } from "react";
import { Api } from "../../services/api";
import {
  ContentContainer,
  Title,
  Pedido,
  ItemPedido,
  Produto,
} from "./PedidosClientes";
//setItemPedidos(pedidosClienteId[0].cliente.pedido[0].itensPedidos);

const PedidosClientes = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const idCliente = JSON.parse(sessionStorage.getItem("user")).id;
      //console.log(idCliente);

      Api.get("/pedidos")
        .then((result) => {
          const pedidosClienteId = result.data.filter(
            (pedido) =>
              pedido.cliente === idCliente ||
              pedido.cliente.idPedido === idCliente
          );
          let pedidosDoCliente = pedidosClienteId;
          pedidosDoCliente.forEach((element) => {
            Api.get(`/itempedidos?idPedido=${element.idPedido}`)
              .then((result) => {
                element.itensPedidos = result.data;
              })
              .catch((error) => {
                console.log(error.response);
                console.log("erro api itemPedidos");
              });
          });
          setPedidos(pedidosDoCliente);
        })
        .catch((error) => {
          console.log(error.response);
          console.log("erro api pedidos");
        });
    };

    fetchPedidos();
  }, []);

  return (
    <>
      <ContentContainer className="containerPedidos">
        <Title>Pedidos</Title>
        {pedidos ? (
          pedidos.map((element) => {
            return (
              <Pedido key={element.idPedido}>
                <div className="infoPedido">
                  <h3>
                    Pedido: {element.idPedido} - Status: {element.status}
                  </h3>

                  <p>
                    Data Pedido:{" "}
                    {element.dataPedido
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>

                  <h4>Valor Total: R${element.valorTotal}</h4>
                </div>
                <ItemPedido>
                  {Object.entries(element.itensPedidos).map(
                    (produto, index) => {
                      {
                        if (produto[1].produto) {
                          console.log(produto[1]);
                          return (
                            <Produto>
                              <div className="infoPedido">
                                <h3>Produto:</h3>
                                <img
                                  src={`https://api-restful-trabalho-final-production.up.railway.app/api/produtos/${produto[1].produto}/img`}
                                  alt={produto.produto}
                                />
                                <p>Quantidade: {produto.quantidade}</p>
                                <p>Valor unitário: R$ {produto.precoVenda}</p>
                                <h4>Valor Total: R$ {produto.valorLiquido}</h4>
                              </div>
                            </Produto>
                          );
                        }
                      }
                    }
                  )}
                </ItemPedido>
              </Pedido>
            );
          })
        ) : (
          <p>Não foi encontrado nenhum pedido em seu nome</p>
        )}
      </ContentContainer>
    </>
  );
};

export default PedidosClientes;
