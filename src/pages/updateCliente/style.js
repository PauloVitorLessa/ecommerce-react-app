import styled from "styled-components";

export const ContentContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    width: 500px;
    background-color: #282d32;
    margin-top: 50px;
    margin-bottom: 50px;
    border-radius: 13px;
    box-shadow:0px 0px 20px 5px #601860;
    color: white;

    input{
        padding: 8px;
        margin-bottom: 10px;
        background-color: #601860;
        height: 30px;
        border-color: #601860;
        border-radius: 20px;
    }
    button{
        padding: 8px 16px;
        background-color: #ad7dd1;
        color: #282d32 ;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: 0.4s;

    &:hover {
        transform: scale(1.1);
        box-shadow: 7px 8px 14px 3px #601860;
    }
    }
}

`;