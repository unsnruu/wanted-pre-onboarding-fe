import styled from "@emotion/styled";

const Background = styled.div<{ isModalOn: boolean }>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  display: ${({ isModalOn }) => (isModalOn ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.div`
  width: 80vw;
  height: 30vh;
  position: absolute;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 1rem;

  & h2 {
    width: 100%;
    margin-bottom: 2.5rem;
    text-align: center;
    @media (max-width: 578px) {
      font-size: 1.2rem;
    }
  }
  & div {
    display: flex;
    width: 100%;
    padding: 0rem 3rem;
  }
  & div span {
    flex: 5;
    padding: 0.5rem;
    text-align: center;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  & div span:first-of-type {
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
  }
  & div span:last-of-type {
    flex: 5;
  }
`;

interface ModalProps {
  message: string;
  isModalOn: boolean;
  handleClickAgreeDelete: () => void;
  handleClickCancelDelete: () => void;
}

function Modal({
  message,
  isModalOn,
  handleClickAgreeDelete,
  handleClickCancelDelete,
}: ModalProps) {
  return (
    <Background isModalOn={isModalOn}>
      <ModalContainer>
        <h2>{message}</h2>
        <div>
          <span onClick={handleClickCancelDelete}>아니요</span>
          <span onClick={handleClickAgreeDelete}>네</span>
        </div>
      </ModalContainer>
    </Background>
  );
}

export default Modal;
