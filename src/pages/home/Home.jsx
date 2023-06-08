import { useState, useEffect } from "react";
import { Api } from "../../services/api.js";
import {
  Card_body,
  ContentContainer,
  Img_container,
  Card_container,
} from "./style.js";

function Home() {
  const [prodId, setProdId] = useState(1);
  const [prod, setProd] = useState([]);

  useEffect(() => {
    async function fetchData() {
      Api.get(`/produtos/${prodId}`)
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
  }, [prodId]);

  return (
    <>
      <ContentContainer className="container-md">
        <Card_container>
          <Img_container>
            <img
              src={`https://api-restful-trabalho-final-production.up.railway.app/api/produtos/${prodId}/img`}
              alt={prod.nome}
            />
          </Img_container>
          <Card_body>
            <h5 className="card-title">{prod.nome}</h5>
            <p className="card-text">{prod.descricao}</p>
            <h5 className="card-price">R$ {prod.valorUnitario}</h5>
            <h5 className="card-id">#{prodId}</h5>
          </Card_body>
        </Card_container>
        <button onClick={() => setProdId((prodId) => prodId + 1)}>
          próximo
        </button>
        <button onClick={() => setProdId((prodId) => prodId - 1)}>
          anterior
        </button>
      </ContentContainer>
    </>
  );
}

export default Home;
