import styled from "@emotion/styled";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div``;

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/todo");
    } else {
      return;
    }
  }, []);
  return (
    <div>
      <Container>
        <h1>첫 화면</h1>
        <div>
          <h3>할 일을 기록해보세요!</h3>
        </div>
        <div>
          <Link to={"/auth/signin"}>로그인</Link>
          <Link to={"/auth/signup"}>회원가입</Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;
