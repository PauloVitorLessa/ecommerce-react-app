import { useState, useEffect } from "react";
import cardBack from "../../assets/cardBack.jpg";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { ContentContainer, Img_container, Card_container } from "./style.js";
import { Api } from "../../services/api.js";
function RegisterProduct() {
  const [smShow, setSmShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(cardBack);
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  useEffect(() => {
    async function fetchCategorias() {
      Api.get("/categorias")
        .then((result) => {
          setCategorias(result.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    fetchCategorias();
  }, []);
  const handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];
    setImagePreview(image_as_base64);
    setImageFile(image_as_files);
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (imageFile !== null) {
      if (
        nome !== "" &&
        descricao !== "" &&
        quantidade !== "" &&
        preco !== "" &&
        categoria !== ""
      ) {
        let formData = new FormData();
        let produtoJson = {
          nome: nome,
          descricao: descricao,
          qtdEstoque: quantidade,
          valorUnitario: preco,
          categoria: {
            idCategoria: categoria,
          },
        };
        formData.append("produtoDTO", JSON.stringify(produtoJson));
        formData.append("source", imageFile);

        Api.post("/produtos", formData)
          .then((res) => {
            console.log(res.data);
            setModalTitle("Sucesso");
            setModalBody("O produto foi Registrado");
            setSmShow(true);
          })
          .catch((err) => {
            console.log(err);
            setModalTitle("Erro");
            setModalBody("Erro ao registrar no banco de dados");
            setSmShow(true);
          });
      }
    } else {
      setModalTitle("Erro");
      setModalBody("Selecione uma Imagem");
      setSmShow(true);
    }
  };

  return (
    <>
      <ContentContainer className="container-md">
        <Card_container>
          <Img_container>
            <img src={imagePreview} alt="image preview" />
          </Img_container>
        </Card_container>
        <label htmlFor="arquivo" className="arquivo">
          Selecionar Imagem
        </label>
        <input type="file" onChange={handleImagePreview} id="arquivo" />
        <form
          onSubmit={(e) => {
            handleSubmitFile(e);
          }}
        >
          <div>
            <label>Nome</label>
            <input
              type="text"
              onChange={(e) => setNome((nome) => e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descrição</label>
            <input
              type="text"
              onChange={(e) => setDescricao((descricao) => e.target.value)}
              required
            />
          </div>
          <div>
            {categorias.map((element) => (
              <div key={element.idCategoria}>
                <input
                  type="radio"
                  value={element.idCategoria}
                  name="categoria"
                  required
                  onChange={(e) => setCategoria((categoria) => e.target.value)}
                ></input>
                <label>{element.nome}</label>
              </div>
            ))}
          </div>
          <div>
            <label>Quantidade</label>
            <input
              type="number"
              onChange={(e) => setQuantidade((quantidade) => e.target.value)}
              min={0}
              required
            />
          </div>
          <div>
            <label>R$</label>
            <input
              type="number"
              placeholder="0.00"
              required
              name="price"
              min="0"
              step="0.01"
              pattern="^\d+(?:\.\d{1,2})?$"
              onChange={(e) => setPreco((preco) => e.target.value)}
            />
          </div>
          <button type="submit">Registrar</button>
        </form>
        {/* <button onClick={() => setProdId((prodId) => prodId - 1)}>
          anterior
        </button> */}
      </ContentContainer>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterProduct;

// useEffect(() => {
//   async function handleImagePreview() {
//     CardApi.get(`/cardinfo.php?name=${cardName}`)
//       .then((result) => {
//         setCard(result.data.data[0]);
//         setCardImage(result.data.data[0].card_images[0]);
//       })
//       .catch((error) => {
//         console.log(error.response);
//         setCard({ name: "Não Encontrado" });
//         setCardImage({ image_url: cardBack });
//       });
//   }

//   fetchData();
// }, [cardName]);
