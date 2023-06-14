import styled from "styled-components";

export const ContentContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: auto;
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
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 13px;
    box-shadow:0px 0px 20px 5px #601860;
`;

export const Cliente = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    background-color: #282d32;
    text-align: center;
    padding: 10px 0;
    margin: 10px;
    border-radius: 13px;
    color: white;
    box-shadow:0px 0px 20px 5px #601860;

    h2 {
        margin: 0 0 20px 0;
    }
`;