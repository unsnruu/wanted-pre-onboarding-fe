import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
/**
 * todos
 * 1. 이메일과 비밀번호의 validation 필수.
 * 2. 버튼 활성화를 그에 따라서 진행할 것
 */

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
    } catch (err) {
      console.error(err);
    }

    resetValues();
  };
  const resetValues = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}

export default SignUp;
