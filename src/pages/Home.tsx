import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { AuthContext } from "../context/AuthContext";

const Background = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  width: 100vw;
  height: 100vh;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 3rem;
`;
const Title = styled.h2`
  text-align: center;
`;
const AuthLinkContainer = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  & > a {
    margin-right: 1rem;
    text-decoration: none;
    color: black;
  }
  & > a:last-of-type {
    color: ${({ theme }) => theme.color.primary};
  }
  @media (max-width: 578px) {
    position: relative;
  }
`;
function Home() {
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const accessToken = getToken();
    if (accessToken) {
      navigate("/todo");
    } else {
      return;
    }
  }, [getToken, navigate]);

  return (
    <Background>
      <Container>
        <Title>할 일을 기록해보세요!</Title>
        <AuthLinkContainer>
          <Link to={"/auth/signin"}>로그인</Link>
          <Link to={"/auth/signup"}>회원가입</Link>
        </AuthLinkContainer>
      </Container>
    </Background>
  );
}

export default Home;
