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
function UpdateProduct() {
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

  const base64ToArrayBuffer = (base64) => {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  const handleFileDataType = (ext) => {
    switch (ext) {
      case "pdf":
        return "application/pdf";
      case "jpg":
        return "image/jpeg";
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "tiff":
        return "image/tiff";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
  };

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

  useEffect(() => {
    function setInputs() {
      setNome(prodSelect.nome);
      setDescricao(prodSelect.descricao);
      setQuantidade(prodSelect.qtdEstoque);
      setPreco(prodSelect.valorUnitario);
      setIdCategoria(prodSelect.idCategoria);
      setNomeCategoria(prodSelect.nomeCategoria);
    }

    setInputs();
  }, [prodSelect]);

  useEffect(() => {
    async function fetchProdutos() {
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

  const handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];
    setImagePreview(image_as_base64);
    setImageFile(image_as_files);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (
      nome !== "" &&
      descricao !== "" &&
      quantidade !== "" &&
      preco !== "" &&
      Idcategoria !== "" &&
      nomeCategoria !== ""
    ) {
      let formData = new FormData();
      let produtoJson = {
        idProduto: prodSelect.idProduto,
        nome: nome,
        descricao: descricao,
        qtdEstoque: quantidade,
        valorUnitario: preco,
        idCategoria: Idcategoria,
        nomeCategoria: nomeCategoria,
      };
      formData.append("produtoDTO", JSON.stringify(produtoJson));
      console.log(produtoJson);

      if (imageFile) {
        formData.append("source", imageFile);
      } else {
        let file = new File(
          [base64ToArrayBuffer(prodSelect.imagem)],
          `${prodSelect.nome}`,
          { type: handleFileDataType("jpeg"), lastModified: new Date() }
        );
        formData.append("source", file);
      }

      const token = getSession("user").accessToken;

      Api.put("/produtos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          setModalTitle("Sucesso");
          setModalBody("O produto foi Atualizado");
          setSmShow(true);
          if (sucesso == true) {
            setSucesso(false);
          }
          if (sucesso == false) {
            setSucesso(true);
          }
          if (imageFile) {
            setProdSelectImg(URL.createObjectURL(imageFile));
          }
        })
        .catch((err) => {
          console.log(err);
          setModalTitle("Erro");
          setModalBody("Erro ao registrar no banco de dados");
          setSmShow(true);
        });
    }
  };

  return (
    <>
      <ContentContainer className="container-md">
        <h2>Atualizar Produtos</h2>
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
                        setProdSelect(prod),
                        setNome(prod.nome),
                        setIdCategoria(prod.idCategoria),
                        setNomeCategoria(prod.nomeCategoria),
                        setDescricao(prod.descricao),
                        setPreco(prod.valorUnitario),
                        setQuantidade(prod.qtdEstoque)
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
            <p>Imagem Atual</p>
            <Img_container>
              <img src={prodSelectImg} alt="image preview" />
            </Img_container>
          </Card_container>
          <Card_container>
            <p>Nova Imagem</p>
            <Img_container>
              <img src={imagePreview} alt="image preview" />
            </Img_container>
            <label htmlFor="arquivo" className="arquivo">
              Selecionar Imagem
            </label>
            <input
              className="SelectImagem"
              type="file"
              onChange={handleImagePreview}
              id="arquivo"
            />
          </Card_container>
          <FormContainer>
            <form
              onSubmit={(e) => {
                handleSubmitFile(e);
              }}
            >
              <label>Nome</label>
              <input
                value={nome}
                type="text"
                onChange={(e) => setNome(e.target.value)}
                required
              />

              <label>Descrição</label>
              <input
                value={descricao}
                type="text"
                onChange={(e) => setDescricao(e.target.value)}
                required
              />

              <label>Quantidade</label>
              <input
                value={quantidade}
                type="number"
                onChange={(e) => setQuantidade(e.target.value)}
                min={0}
                required
              />

              <label>R$</label>
              <input
                value={preco}
                type="number"
                placeholder="0.00"
                required
                name="price"
                min="0"
                step="0.01"
                pattern="^\d+(?:\.\d{1,2})?$"
                onChange={(e) => setPreco(e.target.value)}
              />

              <button type="submit">Atualizar</button>
            </form>
          </FormContainer>
          <CategoriaListContainer>
            {categorias.map((element) => {
              return (
                <div key={element.idCategoria}>
                  <input
                    type="radio"
                    value={element.idCategoria}
                    checked={Idcategoria == element.idCategoria}
                    name="categoria"
                    required
                    onChange={(e) => setIdCategoria(e.target.value)}
                  ></input>
                  <label>{element.nome}</label>
                </div>
              );
            })}
          </CategoriaListContainer>
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

export default UpdateProduct;
