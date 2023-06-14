import styled from "styled-components";

export const ContentContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    height: auto;
    min-height: 100vh;
    flex-direction: column;
    background-color: #fff;
`;

export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: #ad7dd1;
    margin: 0 0 20px 0;
    padding: 10px;
    border-radius: 5px;
`;

export const Cliente = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    background-color: #ad7dd1;
    text-align: center;
    padding: 10px 0;
    margin: 10px;
    border-radius: 5px;

    h2 {
        margin: 0 0 20px 0;
    }
`;