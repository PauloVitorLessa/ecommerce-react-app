import { useState, useEffect } from "react";
import cardBack from "../../assets/cardBack.jpg";
import Modal from "react-bootstrap/Modal";
import { getSession } from "../../services/sessionStorage";

import {
  ContentContainer,
  Img_container,
  CardsContainer,
  Card_container,
  FormContainer,
  ProductsListContainer,
  CategoriaListContainer,
} from "./style.js";
import { Api, ApiLocal } from "../../services/api.js";

function DeleteProduct() {
  const [smShow, setSmShow] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(cardBack);
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [Idcategoria, setIdCategoria] = useState("");
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [prod, setProd] = useState([]);
  const [prodSelectImg, setProdSelectImg] = useState(cardBack);
  const [prodSelect, setProdSelect] = useState({
    nome: "",
    descricao: "",
    qtdEstoque: "",
    valorUnitario: "",
    idCategoria: "",
    nomeCategoria: "",
  });

  useEffect(() => {
    async function fetchProdutos() {
      setProdSelectImg(cardBack);
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

    fetchProdutos();
  }, [sucesso]);

  const handleDeleteCard = (e) => {
    const token = getSession("user").accessToken;

    Api.delete(`/produtos/${prodSelect.idProduto}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setModalTitle("Sucesso");
        setModalBody("O produto foi Removido");
        setSmShow(true);
        if (sucesso == true) {
          setSucesso(false);
        }
        if (sucesso == false) {
          setSucesso(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setModalTitle("Erro");
        setModalBody("Erro ao remover no banco de dados");
        setSmShow(true);
      });
  };

  return (
    <>
      <ContentContainer className="container-md">
        <h2>Remover Produtos</h2>
        <CardsContainer>
          <ProductsListContainer>
            <p>Selecione a Carta</p>
            <ul>
              {prod.map((prod) => {
                return (
                  <li
                    value={prod}
                    onClick={(e) =>
                      setProdSelectImg(
                        (prodSelect) =>
                          `https://api-restful-trabalho-final-production.up.railway.app/api/produtos/${prod.idProduto}/img`,
                        setProdSelect(prod)
                      )
                    }
                    key={prod.idProduto}
                  >
                    {prod.idProduto + "# " + prod.nome}
                  </li>
                );
              })}
            </ul>
          </ProductsListContainer>
          <Card_container>
            <Img_container>
              <img src={prodSelectImg} alt="image preview" />
            </Img_container>
            <button onClick={handleDeleteCard}>Remover Carta</button>
          </Card_container>
        </CardsContainer>

        <FormContainer></FormContainer>
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

export default DeleteProduct;
