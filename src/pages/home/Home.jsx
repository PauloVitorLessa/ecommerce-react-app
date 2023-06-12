import { useState, useEffect } from "react";
import { Api } from "../../services/api.js";
import {
  Card_body,
  ContentContainer,
  Img_container,
  Card_container,
} from "./style.js";

function Home() {
  const [prod, setProd] = useState([]);

  useEffect(() => {
    async function fetchData() {
      Api.get("/produtos")
        .then((result) => {
          setProd(result.data);
        })
        .catch((error) => {
          console.log(error.response);
          setProd({
            nome: "Não Encontrado",
            descricao: "",
            valorUnitario: 0.0,
          });
        });
    }

    fetchData();
  }, []);

  return (
    <>
      <ContentContainer className="container-md">
        {prod.map((prod) => {
          return (
            <Card_container key={prod.idProduto}>
              <Img_container>
                <img
                  src={`https://api-restful-trabalho-final-production.up.railway.app/api/produtos/${prod.idProduto}/img`}
                  alt={prod.nome}
                />
              </Img_container>
              <Card_body>
                <h6 className="card-title">{prod.nome}</h6>
              </Card_body>
              <h6 className="card-price">R$ {prod.valorUnitario}</h6>
            </Card_container>
          );
        })}
      </ContentContainer>
    </>
  );
}

export default Home;
