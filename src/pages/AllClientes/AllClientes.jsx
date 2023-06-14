import { useEffect, useState } from "react";
import { Api } from "../../services/api";
import { ContentContainer, Title, Cliente } from './style';

const AllClientes = () => {

    const [clienteData, setClienteData] = useState([]);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const clientesTemp = await Api.get(`/clientes`);
        setClienteData(clientesTemp.data);
    }

    return (
        <>
        <ContentContainer className="containerPedidos">
            <Title>Clientes</Title> 
            {clienteData ? ( 
                clienteData.map(cliente => {
                    return (
                        <Cliente key={cliente.id}>
                            <div className="infoCliente">
                                <h2>Id: {cliente.id}</h2>
                                <h3>Nome: {cliente.nome}</h3>
                                <p>Email: {cliente.email}</p>
                                <p>Telefone: {cliente.telefone}</p>
                                <p>CPF: {cliente.cpf}</p>
                                <p>CEP: {cliente.endereco.cep}</p>
                            </div>    
                        </Cliente>
                    )
                })
            ) : (
                <p>Não foi encontrado nenhum pedido em seu nome</p>
            )}
        </ContentContainer>
        </>
    );
};

export default AllClientes;