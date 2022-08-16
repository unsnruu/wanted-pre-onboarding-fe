import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
  margin: 1rem;
  display: flex;
  justify-content: center;
  @media (max-width: 578px) {
    width: 100%;
    margin: 0;
    bottom: 0;
  }
`;

function Floating({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}

export default Floating;
