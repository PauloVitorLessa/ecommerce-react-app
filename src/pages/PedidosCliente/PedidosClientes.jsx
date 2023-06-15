// Fazer a requizição para a API p/ ter acesso aos pedidos
//   Armazenar em um array
// Filtrar pelo id do cliente logado
// Exibir em tela os pedidos daquele cliente
//   Seguindo o padrão do Figma

import { useEffect, useState } from "react";
import UseDidMountEffect from "./UseDidMountEffect";
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
  const [itensPedidos, setItenPedidos] = useState([]);
  const [state, setState] = useState({
    key: false,
  });

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

          setPedidos(pedidosClienteId);
          setState(true);
        })
        .catch((error) => {
          console.log(error.response);
          console.log("erro api pedidos");
        });
    };

    fetchPedidos();
  }, []);

  UseDidMountEffect(() => {
    // react please run me if 'key' changes, but not on initial render

    let copiapedidos = pedidos;
    copiapedidos.forEach((element) => {
      Api.get(`/itempedidos?idPedido=${element.idPedido}`)
        .then((result) => {
          element.itensPedidos = result.data;
        })
        .catch((error) => {
          console.log(error.response);
          console.log("erro api itemPedidos");
        });
    });

    console.log(copiapedidos);
    setItenPedidos(copiapedidos);
  }, [state]);

  return (
    <>
      <ContentContainer className="containerPedidos">
        <Title>Pedidos</Title>
        {itensPedidos ? (
          itensPedidos.map((element) => {
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
                  {element.itensPedidos
                    .filter((produto) => produto.produto)
                    .map((produto, index) => {
                      return (
                        <Produto key={index}>
                          <div className="infoPedido">
                            <h3>Produto:</h3>
                            <img
                              src={`https://api-restful-trabalho-final-production.up.railway.app/api/produtos/${produto.produto}/img`}
                              alt={produto.produto}
                            />
                            <p>Quantidade: {produto.quantidade}</p>
                            <p>Valor unitário: R$ {produto.precoVenda}</p>
                            <h4>Valor Total: R$ {produto.valorLiquido}</h4>
                          </div>
                        </Produto>
                      );
                    })}
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
