import { useState, useEffect } from "react";
import cardBack from "../../assets/cardBack.jpg";
import Modal from "react-bootstrap/Modal";
import { getSession } from "../../services/sessionStorage";

import { Api } from "../../services/api.js";

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
          console.log(result.data.endereco);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    fetchCliente();
  }, []);

  useEffect(() => {
    function setImputs() {
      setIdCliente(user.idCliente);
      setNome(user.nome);
      setEmail(user.email);
      setDataNascimento(user.dataNascimento);
      setCpf(user.cpf);
      setTelefone(user.telefone);
      setUsername(user.username)
      setPassword(user.password)
      setCep(userEndereco.cep);
      setNumero(userEndereco.numero);
      setIdEndereco(userEndereco.idEndereco);
    }

    setImputs()
  }, [user]);


  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    if(nome !== "" && email !== "" && dataNascimento !== "" && cpf !== "" && telefone !== "" && cep !== "" && numero !== ""){
      let clienteJson = {
        idCliente: idCliente,
        nome: nome,
        email: email,
        dataNascimento: dataNascimento,
        cpf: cpf,
        telefone: telefone,
        username: username,
        password: password
      }

      let enderecoJson = {
        idEndereco: idEndereco,
        cep: cep,
        numero: numero
      }

      const token = getSession("user").accessToken;

      Api.put("/enderecos", enderecoJson, {
        headers: {
          Authorization: `Bearer ${token}`,
        }})
        .then((res) => {
          console.log(res.data);
          setModalTitle("Sucesso");
          setModalBody("O endereço foi atualizado");
          setSmShow(true);
        })
        .catch((err) => {
          console.log(err);
          setModalTitle("Erro");
          setModalBody("Erro ao registrar no banco de dados");
          setSmShow(true);
        });

      Api.put(`/clientes`, clienteJson, {
        headers: {
          Authorization: `Bearer ${token}`,
        }})
        .then((res) => {
          console.log(res.data);
          setModalTitle("Sucesso");
          setModalBody("O cliente foi atualizado");
          setSmShow(true);
        })
        .catch((err) => {
          console.log(err);
          setModalTitle("Erro");
          setModalBody("Erro ao registrar no banco de dados");
          setSmShow(true);
        });
    }
  }

  return (
    <>
      <div className="container">
        <h2>Atualizar Cliente</h2>
        <form onSubmit={(e) => handleSubmitUpdate(e)}>
          <label>Nome</label>
          <input value={nome} type="text" onChange={(e) => setNome(e.target.value)} />
          <label>Data Nascimento</label>
          <input value={dataNascimento} type="text" onChange={(e) => setDataNascimento(e.target.value)} />
          <label>Cpf</label>
          <input value={cpf} type="numero" onChange={(e) => setCpf(e.target.value)} />
          <label>Telefone</label>
          <input value={telefone} type="tel" onChange={(e) => setTelefone(e.target.value)} />
          <label>Cep</label>
          <input value={cep} type="numero" onChange={(e) => setCep(e.target.value)} />
          <label>Numero</label>
          <input value={numero} type="numero" onChange={(e) => setNumero(e.target.value)} />
          <button type="submit">Atualizar</button>
        </form>
      </div>
    </>
  );
}

export default UpdateCliente;