import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
`;

interface ModalProps {
  message: string;
}

function Modal({ message }: ModalProps) {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Container isVisible={isVisible}>
      <div>{message}</div>
      <div>
        <span>네</span>
        <span>아니요</span>
      </div>
    </Container>
  );
}

export default Modal;
