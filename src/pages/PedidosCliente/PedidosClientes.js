import styled from "styled-components";

export const ContentContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    height: auto;
    min-height: 100vh;
    flex-direction: column;
    background-color: #ad7dd1;
`;

export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: #282d32;
    color: white;
    margin-top: 50px;
    padding: 10px;
    border-radius: 13px;
`;

export const Pedido = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    background-color: #282d32;
    text-align: center;
    padding: 10px 0;
    border-radius: 13px;
    color: white;

    h3 {
        color: white;
        margin: 0 0 20px 0;

    }
`;