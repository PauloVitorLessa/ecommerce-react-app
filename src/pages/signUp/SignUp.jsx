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
  const errRef = useRef();

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
  const [validNama, setValidName] = useState(false);
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

  const [rua, setRua] = useState("");
  const [validRua, setValidRua] = useState(false);
  const [ruaFocus, setRuaFocus] = useState(false);

  const [bairro, setBairro] = useState("");
  const [validBairro, setValidBairro] = useState(false);
  const [bairroFocus, setTBairroFocus] = useState(false);

  const [cidade, setCidade] = useState("");
  const [validCidade, setValidCidade] = useState(false);
  const [cidadeFocus, setCidadeFocus] = useState(false);

  const [uf, setTUf] = useState("");
  const [validUf, setValidUf] = useState(false);
  const [ufFocus, setUfFocus] = useState(false);

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
    setValidUser(result);
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
    setErrMsg(null);
  }, [user, pwd, matchPwd, data, cep, cpf, numero, name, email, telefone]);

  return (
    <div className="container">
      <section className="signUpSection">
        <p
          ref={errMsg}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h2 className="signUpH2">SignUp</h2>
        <form className="signUpForm">
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
            onChange={(e) => setUser(e.target.value)}
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
            onChange={(e) => setPwd(e.target.value)}
            required
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
            onChange={(e) => setMatchPwd(e.target.value)}
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
          <button
            className="signUpButton"
            disabled={!validUser || !validPwd || !validMatch ? true : false}
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
