import React, { useState } from "react";
import {
  Error,
  Form,
  Guthub,
  Input,
  Title,
  Wrapper,
} from "../styles/createAccountStyle";
import { FirebaseError } from "firebase/app";
import {
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const onClickGit = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          type="email"
          placeholder="이메일"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          type="password"
          placeholder="비밀번호"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "회원가입하기"}
        />
      </Form>
      <Guthub onClick={onClickGit}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 30 30"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.25 23.75C5 25.625 5 20.625 2.5 20M20 27.5V22.6625C20.0469 22.0665 19.9664 21.4673 19.7638 20.9048C19.5612 20.3423 19.2412 19.8293 18.825 19.4C22.75 18.9625 26.875 17.475 26.875 10.65C26.8747 8.90483 26.2034 7.22654 25 5.96254C25.5698 4.43568 25.5295 2.74798 24.8875 1.25004C24.8875 1.25004 23.4125 0.812544 20 3.10004C17.135 2.32357 14.115 2.32357 11.25 3.10004C7.8375 0.812544 6.3625 1.25004 6.3625 1.25004C5.72047 2.74798 5.68018 4.43568 6.25 5.96254C5.03766 7.23592 4.36565 8.92937 4.375 10.6875C4.375 17.4625 8.5 18.95 12.425 19.4375C12.0137 19.8625 11.6966 20.3693 11.4941 20.9249C11.2917 21.4806 11.2085 22.0726 11.25 22.6625V27.5" />
        </svg>
        <p>Github로 로그인하기</p>
      </Guthub>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
};

export default Login;
