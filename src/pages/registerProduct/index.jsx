import { useState, useEffect } from "react";
import { CardApi } from "../../services/api.js";
import cardBack from "../../assets/cardBack.jpg";
import {
  Card_body,
  ContentContainer,
  Img_container,
  Card_container,
} from "./style.js";

function RegisterProduct() {
  const [cardName, setCardName] = useState("");
  const [card, setCard] = useState([]);
  const [cardImage, setCardImage] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      CardApi.get(`/cardinfo.php?name=${cardName}`)
        .then((result) => {
          setCard(result.data.data[0]);
          setCardImage(result.data.data[0].card_images[0]);
        })
        .catch((error) => {
          console.log(error.response);
          setCard({ name: "Não Encontrado" });
          setCardImage({ image_url: cardBack });
        });
    }

    fetchData();
  }, [cardName]);

  return (
    <>
      <ContentContainer className="container-md">
        <Card_container>
          <Img_container>
            {console.log(cardImage)}
            <img src={cardImage.image_url} alt="aa" />
          </Img_container>
          <Card_body>
            <h5 className="card-title">{card.name}</h5>
            <p className="card-text">{card.desc}</p>
          </Card_body>
        </Card_container>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput((input) => e.target.value)}
        />
        <button onClick={() => setCardName((cardName) => input)}>
          próximo
        </button>
        {/* <button onClick={() => setProdId((prodId) => prodId - 1)}>
          anterior
        </button> */}
      </ContentContainer>
    </>
  );
}

export default RegisterProduct;
