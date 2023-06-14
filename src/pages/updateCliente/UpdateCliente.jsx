import { useState, useEffect } from "react";
import cardBack from "../../assets/cardBack.jpg";
import Modal from "react-bootstrap/Modal";
import { getSession } from "../../services/sessionStorage";
import { ContentContainer } from "./style";

import { Api, ApiLocal } from "../../services/api.js";

function UpdateCliente() {
  //Armazenar as infos que serão necessárias
  const [user, setUser] = useState([]);
  const [userEndereco, setUserEndereco] = useState([]);

  //
  const [smShow, setSmShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  //Infos clientes
  const [idCliente, setIdCliente] = useState();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  //Infos endereço
  const [idEndereco, setIdEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");

  useEffect(() => {
    async function fetchCliente() {
      const idCliente = JSON.parse(sessionStorage.getItem("user")).id;
      Api.get(`/clientes/${idCliente}`)
        .then((result) => {
          setUser(result.data);
          setUserEndereco(result.data.endereco);
          setIdCliente(result.data.idCliente);
          setNome(result.data.nome);
          setEmail(result.data.email);
          setDataNascimento(
            result.data.dataString.slice(0, 10).split("-").reverse().join("/")
          );
          setCpf(result.data.cpf);
          setTelefone(result.data.telefone);
          setUsername(result.data.username);
          setCep(result.data.endereco.cep);
          setNumero(result.data.endereco.numero);
          if (result.data.roles[0].name == "ROLE_ADMIN") {
            setRole("admin");
          } else {
            setRole("user");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    fetchCliente();
  }, []);

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    if (
      nome !== "" &&
      email !== "" &&
      dataNascimento !== "" &&
      cpf !== "" &&
      telefone !== "" &&
      cep !== "" &&
      numero !== ""
    ) {
      let enderecoJson = {
        cep: cep,
        numero: numero,
      };

      Api.post("/enderecos", enderecoJson)
        .then((res) => {
          let idNovoEndereco = res.data.idEndereco;

          let clienteJson = {
            idCliente: idCliente,
            nome: nome,
            email: email,
            dataString: dataNascimento,
            cpf: cpf,
            telefone: telefone,
            username: username,
            password: password,
            strRoles: [role],
            endereco: {
              idEndereco: idNovoEndereco,
            },
          };
          Api.put("/clientes", clienteJson)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log("erro na req clientes");
              console.log(clienteJson);
              console.log(err);
              setModalTitle("Erro");
              setModalBody("Erro ao registrar no banco de dados");
              setSmShow(true);
            });

          setModalTitle("Sucesso");
          setModalBody("Dados Atualizados");
          setSmShow(true);
        })
        .catch((err) => {
          console.log("erro na req endereco");
          console.log(err);
          setModalTitle("Erro");
          setModalBody("Cep Inválido");
          setSmShow(true);
        });
    }
  };

  return (
    <>
      <ContentContainer>
        <div className="container">
          <h2>Atualizar Cliente</h2>
          <form onSubmit={(e) => handleSubmitUpdate(e)}>
            <label></label>
            Nome <br />
            <input
              required
              value={nome}
              type="text"
              onChange={(e) => setNome(e.target.value)}
            /><br />
            <label></label>
            Data Nascimento <br />
            <input
              required
              value={dataNascimento}
              type="text"
              onChange={(e) => setDataNascimento(e.target.value)}
            /><br />
            <label></label>
            Cpf <br />
            <input
              required
              value={cpf}
              type="numero"
              onChange={(e) => setCpf(e.target.value)}
            /><br />
            <label></label>
            Telefone <br />
            <input
              required
              value={telefone}
              type="tel"
              onChange={(e) => setTelefone(e.target.value)}
            /><br />
            <label></label>
            Cep <br />
            <input
              required
              value={cep}
              type="numero"
              onChange={(e) => setCep(e.target.value)}
            /> <br />
            <label></label>
            Numero <br />
            <input
              required
              value={numero}
              type="numero"
              onChange={(e) => setNumero(e.target.value)}
            /> <br />
            <label></label>
            Nova Senha <br />
            <input
              value={password}
              type="text"
              required
              onChange={(e) => setPassword(e.target.value)}
            /> <br />
            <button type="submit">Atualizar</button>
          </form>
        </div>
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
      </ContentContainer>

    </>
  );
}

export default UpdateCliente;
