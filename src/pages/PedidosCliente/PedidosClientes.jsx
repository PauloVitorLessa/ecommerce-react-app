// Fazer a requizição para a API p/ ter acesso aos pedidos
//   Armazenar em um array
// Filtrar pelo id do cliente logado
// Exibir em tela os pedidos daquele cliente
//   Seguindo o padrão do Figma

import { useEffect, useState } from "react";
import { Api } from "../../services/api";
import { ContentContainer, Title, Pedido } from './PedidosClientes';

const PedidosClientes = () => {

    const [pedidosCliente, setPedidosClientes] = useState([]);

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        const idCliente = JSON.parse(sessionStorage.getItem("user")).id;

        const pedidosTemp = await Api.get(`/pedidos`);
        
        const pedidosClienteId = pedidosTemp.data.filter(pedido => pedido.cliente.idCliente === idCliente);
        setPedidosClientes(pedidosClienteId);
    }

    const verificarData = (dataPedido, dataEntrega, dataEnvio) => {
        if(dataPedido !== null && dataEntrega === null && dataEnvio === null) {
            return "----";
        }
        else if(dataPedido !== null && dataEnvio === null && dataEntrega !== null ) {
            return "Data Envio: " + dataEnvio;
        }
        else if(dataPedido !== null && dataEnvio !== null && dataEntrega !== null) {
            return "Data Entrega: " + dataEntrega;
        }
        else {
            return "Data não fornecida"
        }
    }

    return (
        <>
        <ContentContainer className="containerPedidos">
            <Title>Pedidos</Title> 
            {pedidosCliente ? ( 
                pedidosCliente.map(pedido => {
                    return (
                        <Pedido key={pedido.idPedido}>
                            <div className="infoPedido">
                                <h3>Pedido: {pedido.idPedido} - Status: {pedido.status}</h3>
                                <p>Data Pedido: {pedido.dataPedido}</p>
                                <p>{verificarData(pedido.dataPedido, pedido.dataEnvio, pedido.dataEntrega)}</p>
                                <h4>Valor Total: R${pedido.valorTotal}</h4>
                            </div> 
                        </Pedido>
                    )
                })
            ) : (
                <p>Não foi encontrado nenhum pedido em seu nome</p>
            )}
        </ContentContainer>
        </>
    );
};

export default PedidosClientes;
