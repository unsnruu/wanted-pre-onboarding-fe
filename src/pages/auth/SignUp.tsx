import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/**
 * todos
 * 1. 이메일과 비밀번호의 validation 필수.
 * 2. 버튼 활성화를 그에 따라서 진행할 것
 */

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    /**
     * todos
     * 1. 서버와 성공적으로 생성이 된 경우 페이지 push하기
     */
    e.preventDefault();

    resetValues();
  };
  const resetValues = () => {
    setEmail("");
    setPassword("");
  };

  const validateUserInfo = (email: string, password: string) => {};

  return (
    <div>
      <h1>Sign Up</h1>
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
