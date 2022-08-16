import styled from "@emotion/styled";
import { MdLogout } from "react-icons/md";

const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color.primary};
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  color: white;
`;

interface HeaderProps {
  handleClickLogout: () => void;
}
function Header({ handleClickLogout }: HeaderProps) {
  return (
    <Container>
      <Title>투두 리스트</Title>
      <nav style={{ marginLeft: "auto" }}>
        <MdLogout
          style={{ color: "white", fontSize: "1.5rem", cursor: "pointer" }}
          onClick={handleClickLogout}
        />
      </nav>
    </Container>
  );
}

export default Header;
