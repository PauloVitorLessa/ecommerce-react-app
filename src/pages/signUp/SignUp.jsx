import { useRef, useState, useEffect } from "react";
import "./style.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Api, Cep, ApiLocal } from "../../services/api.js";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const NAME_REGEX = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{3,60}$/;
const NUMERO_REGEX = /^[0-9]{1,5}$/;
const CPF_REGEX = /^[0-9]{11,11}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const TELEFONE_REGEX = /^[0-9]{11,11}$/;
const DATA_REGEX =
  /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
const CEP_REGEX = /^[0-9]{8,8}$/;

const SignUp = () => {
  const userRef = useRef();
  //const errRef = useRef();

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [cpf, setCpf] = useState("");
  const [validCpf, setValidCpf] = useState(false);
  const [cpfFocus, setCpfFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [telefone, setTelefone] = useState("");
  const [validTelefone, setValidTelefone] = useState(false);
  const [telefoneFocus, setTelefoneFocus] = useState(false);

  const [data, setData] = useState("");
  const [validData, setValidData] = useState(false);
  const [dataFocus, setDataFocus] = useState(false);

  const [cep, setCep] = useState("");
  const [validCep, setValidCep] = useState(false);
  const [cepFocus, setCepFocus] = useState(false);

  const [numero, setNumero] = useState("");
  const [validNumero, setValidNumero] = useState(false);
  const [numeroFocus, setNumeroFocus] = useState(false);

  const [rua, setRua] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [uf, setTUf] = useState(null);

  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValidUser(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    //console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    // console.log(result);
    // console.log(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = NUMERO_REGEX.test(numero);
    //console.log(result);
    //console.log(numero);
    setValidNumero(result);
  }, [numero]);

  useEffect(() => {
    const result = CPF_REGEX.test(cpf);
    //console.log(result);
    // console.log(cpf);
    setValidCpf(result);
  }, [cpf]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = TELEFONE_REGEX.test(telefone);
    // console.log(result);
    // console.log(telefone);
    setValidTelefone(result);
  }, [telefone]);

  useEffect(() => {
    const result = DATA_REGEX.test(data);
    // console.log(result);
    // console.log(data);
    setValidData(result);
  }, [data]);

  useEffect(() => {
    const result = CEP_REGEX.test(cep);
    // console.log(result);
    // console.log(cep);
    setValidCep(result);
  }, [cep]);

  useEffect(() => {
    const fetchCep = async (e) => {
      if (validCep) {
        try {
          const digitos5 = cep.substring(0, 5);
          const digitos3 = cep.substring(8, 5);
          const url = "/" + digitos5 + "-" + digitos3 + ".json";
          const response = await Cep.get(url);
          console.log(response?.data.address);
          console.log(JSON.stringify(response));
          setRua(response.data.address);
          setBairro(response.data.district);
          setCidade(response.data.city);
          setTUf(response.data.state);
        } catch (err) {
          if (!err?.response) {
            setErrMsg("CEP inválido");
          }
        }
      }
    };

    fetchCep();
  }, [validCep]);

  useEffect(() => {
    setErrMsg(null);
  }, [user, pwd, matchPwd, data, cep, cpf, numero, name, email, telefone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    const endereco = {
      cep: cep,
      numero: numero,
    };

    Api.post("/enderecos", endereco)
      .then((res) => {
        const clienteDTO = {
          cpf: cpf,
          nome: name,
          email: email,
          telefone: telefone,
          dataString: data,
          username: user,
          password: pwd,
          endereco: {
            idEndereco: res.data.idEndereco,
          },
        };

        Api.post("/clientes", clienteDTO)
          .then((res) => {
            console.log("entrou");
            setUser("");
            setPwd("");
            setMatchPwd("");
            setCep("");
            setCpf("");
            setData("");
            setEmail("");
            setName("");
            setTelefone("");
            setNumero("");
            setRua("");
            setSuccess("Usuário Registrado com Sucesso");
          })
          .catch((err) => {
            if (!err?.response) {
              setErrMsg("No Server Response");
            } else if (err.response?.data === "Erro: Username já utilizado!") {
              console.log(err.response);
              setErrMsg("Username já utilizado");
            } else if (err.response?.data === "Erro: Email já utilizado!") {
              console.log(err.response);
              setErrMsg("e-mail já utilizado");
            } else if (err.response?.data === "Erro: Telefone já utilizado!") {
              console.log(err.response);
              setErrMsg("Telefone já utilizado");
            } else if (err.response?.data === "Erro: CPF já utilizado!") {
              console.log(err.response);
              setErrMsg("CPF já utilizado");
            } else {
              console.log(err.response);
              setErrMsg("Falha ao Registrar");
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <section className="signUpSection">
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <p className={success ? "successmsg" : "offscreen"}>{success}</p>
        <h2 className="signUpH2">SignUp</h2>
        <form className="signUpForm" onSubmit={handleSubmit}>
          <label htmlFor="username" className="signUpLabel">
            Usuário:
            <span className={validUser ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validUser || !user ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="signUpInput"
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
              setSuccess(false);
            }}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validUser ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 a 24 caracteres.
            <br />
            Deve começar com uma letra.
            <br />
            Letras, números, underlines, hifens permitidos.
          </p>

          <label htmlFor="password" className="signUpLabel">
            Senha:
            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="signUpInput"
            type="password"
            id="password"
            onChange={(e) => {
              setPwd(e.target.value), setSuccess(false);
            }}
            required
            value={pwd}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            6 a 24 caracteres.
            <br />
            Deve incluir letras em caixa alta, baixa
            <br />
            e ao menos um número e um caracter especial.
            <br />
            Caracteres especiais permitidos:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
          <label className="signUpLabel" htmlFor="confirm_pwd">
            Confirme a senha:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <input
            className="signUpInput"
            type="password"
            id="confirm_pwd"
            onChange={(e) => {
              setMatchPwd(e.target.value), setSuccess(false);
            }}
            value={matchPwd}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            As senhas devem ser iguais.
          </p>
          <label htmlFor="email" className="signUpLabel">
            e-mail:
            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="signUpInput"
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value), setSuccess(false);
            }}
            required
            value={email}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            e-mail inválido.
          </p>
          <label htmlFor="username" className="signUpLabel">
            Nome:
            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !name ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="signUpInput"
            type="text"
            id="name"
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value), setSuccess(false);
            }}
            required
            value={name}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
          />
          <p
            id="namenote"
            className={
              nameFocus && name && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Nome inválido.
          </p>

          <label htmlFor="cpf" className="signUpLabel">
            CPF:
            <span className={validCpf ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validCpf || !cpf ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="signUpInput"
            type="text"
            id="cpf"
            autoComplete="off"
            onChange={(e) => {
              setCpf(e.target.value), setSuccess(false);
            }}
            required
            value={cpf}
            onFocus={() => setCpfFocus(true)}
            onBlur={() => setCpfFocus(false)}
          />
          <p
            id="cpfnote"
            className={
              cpfFocus && cpf && !validCpf ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            CPF inválido.
            <br />
            Deve conter apenas números.
          </p>

          <label htmlFor="telefone" className="signUpLabel">
            Telefone:
            <span className={validTelefone ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validTelefone || !telefone ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="signUpInput"
            type="text"
            id="telefone"
            autoComplete="off"
            onChange={(e) => {
              setTelefone(e.target.value), setSuccess(false);
            }}
            required
            value={telefone}
            onFocus={() => setTelefoneFocus(true)}
            onBlur={() => setTelefoneFocus(false)}
          />
          <p
            id="telefonenote"
            className={
              telefoneFocus && telefone && !validTelefone
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Telefone inválido.
            <br />
            Deve conter apenas números:
            <br />2 digitos para o DDD e 9 para o número.
          </p>

          <label htmlFor="data" className="signUpLabel">
            Data de Nascimento:
            <span className={validData ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validData || !data ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="signUpInput"
            type="text"
            id="data"
            autoComplete="off"
            onChange={(e) => {
              setData(e.target.value), setSuccess(false);
            }}
            required
            value={data}
            onFocus={() => setDataFocus(true)}
            onBlur={() => setDataFocus(false)}
          />
          <p
            id="datanote"
            className={
              dataFocus && data && !validData ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Data inválida.
            <br />
            Deve seguir o padrão: dd/mm/aaaa
          </p>

          <label htmlFor="cep" className="signUpLabel">
            CEP:
            <span className={validCep ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validCep || !cep ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="signUpInput"
            type="text"
            id="cep"
            autoComplete="off"
            onChange={(e) => {
              setCep(e.target.value), setSuccess(false);
            }}
            required
            value={cep}
            onFocus={() => setCepFocus(true)}
            onBlur={() => setCepFocus(false)}
          />
          <p
            id="cepnote"
            className={
              cepFocus && cep && !validCep ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            CEP inválido.
            <br />
            Deve conter apenas números: 8 dígitos.
          </p>

          <label htmlFor="numero" className="signUpLabel">
            Número {"(endereço)"}:
            <span className={validNumero ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validNumero || !numero ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="signUpInput"
            type="text"
            id="numero"
            autoComplete="off"
            onChange={(e) => {
              setNumero(e.target.value), setSuccess(false);
            }}
            required
            value={numero}
            onFocus={() => setNumeroFocus(true)}
            onBlur={() => setNumeroFocus(false)}
          />
          <p
            id="numeronote"
            className={
              numeroFocus && numero && !validNumero
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Número inválido.
            <br />
            Deve conter apenas números: mínimo 1 , máximo 5 dígitos.
          </p>

          <p
            id="numeronote"
            className={rua && validNumero ? "instructions" : "offscreen"}
          >
            Rua: {rua}
            <br />
            Bairro: {bairro}
            <br />
            Cidade: {cidade}
            <br />
            UF: {uf}
          </p>

          <button
            className="signUpButton"
            disabled={
              !validUser ||
              !validPwd ||
              !validMatch ||
              !rua ||
              !validCpf ||
              !validData ||
              !validEmail ||
              !validName ||
              !validTelefone
                ? true
                : false
            }
          >
            Sign Up
          </button>
        </form>
        <p>
          Já tem uma conta?
          <br />
          <span className="line">
            <Link className="signUpA" to={"/login"}>
              LogIn
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default SignUp;
