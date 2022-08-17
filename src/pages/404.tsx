import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { IoIosArrowBack } from "react-icons/io";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > h1,
  h2 {
    color: ${({ theme }) => theme.color.highlight};
  }
  & > div {
    margin-top: 2rem;
  }
`;
const BackContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    color: white;
    font-size: 1.5rem;
  }
  & a {
    text-decoration: none;
    color: inherit;
  }
`;

function NotFound() {
  return (
    <Container>
      <h1>죄송합니다</h1>
      <h2>해당 페이지를 찾을 수 없습니다</h2>
      <BackContainer>
        <span>
          <IoIosArrowBack />
        </span>
        <span>
          <Link to="/">홈으로 돌아가기</Link>
        </span>
      </BackContainer>
    </Container>
  );
}

export default NotFound;
