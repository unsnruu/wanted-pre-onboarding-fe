import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

import { AuthContext } from "../../context/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const GoBackContainer = styled.div`
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: 0;
  margin: 1rem;
  & a {
    color: white;
  }
`;
const StyledForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
  & label {
    margin-right: 0.5rem;
    font-weight: 700;
  }
  & input {
    border: none;
    border-bottom: 1px solid black;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
  & input:focus {
    outline: none;
  }
  & button {
    margin-top: 1rem;
    width: 100%;
    height: 2rem;
    font-size: inherit;
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 0.5rem;
    border: none;
    color: white;
    cursor: pointer;
  }
  & button:disabled {
    background-color: lightgray;
    cursor: not-allowed;
    color: gray;
  }
`;

interface AxiosReturn {
  access_token: string;
}

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  useEffect(() => {
    const validateEmail = (email: string) => {
      if (email.includes("@")) return true;
      else return false;
    };
    const validatePassword = (password: string) => {
      if (password.length >= 8) return true;
      else return false;
    };

    if (validateEmail(email) && validatePassword(password)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const { data } = await axios.post<AxiosReturn>("/auth/signup", user, {
        withCredentials: false,
      });
      const { access_token } = data;
      login(access_token);
      resetValues();
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  const resetValues = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <GoBackContainer>
        <Link to="/">
          <IoIosArrowBack />
          <AiFillHome />
        </Link>
      </GoBackContainer>
      <h1 style={{ color: "white" }}>회원가입</h1>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <button disabled={disabled}>가입하기</button>
      </StyledForm>
    </Container>
  );
}

export default SignUp;
