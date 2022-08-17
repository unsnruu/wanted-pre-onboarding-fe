import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import { BsCircle, BsFillCheckCircleFill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-width: 320px;
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 1.2rem;
  overflow: hidden;
  border-bottom: 1px dashed ${({ theme }) => theme.color.dark};
  &:hover div {
    opacity: 1;
  }
`;
const TodoWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  font-weight: 400;
  margin-right: 0.5rem;
  word-break: keep-all;
`;
const IconWrapper = styled.div`
  margin-left: auto;
  display: flex;
  opacity: 0;
  transition: 0.1s linear;
  & > svg {
    cursor: pointer;
  }
  & > svg:first-of-type {
    margin-right: 0.5rem;
  }
`;

interface TodoItemProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  handleClickDeleteButton: (id: number) => () => void;
}

function TodoItem({
  id,
  isCompleted,
  todo,
  handleClickDeleteButton,
}: TodoItemProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClickEdit = () => {
    navigate(`edit/${id}`);
  };

  return (
    <Container>
      <div style={{ marginRight: "0.5rem" }}>
        {isCompleted ? (
          <BsFillCheckCircleFill style={{ color: theme.color.primary }} />
        ) : (
          <BsCircle />
        )}
      </div>
      <TodoWrapper>{todo}</TodoWrapper>
      <IconWrapper>
        <MdEdit onClick={handleClickEdit} />
        <RiDeleteBin2Fill
          style={{ color: theme.color.warning }}
          onClick={handleClickDeleteButton(id)}
        />
      </IconWrapper>
    </Container>
  );
}

export default TodoItem;
