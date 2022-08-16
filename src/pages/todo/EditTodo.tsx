import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

import type { TodoData, TodoOuletContextType } from "./Todo";

import { AuthContext } from "../../context/AuthContext";
import { MdOutlineArrowBack } from "react-icons/md";
import Floating from "../../components/Floating";
import { useTheme } from "@emotion/react";

const Container = styled.div`
  padding: 2rem;
  font-size: 1.2rem; ;
`;
const StyledInput = styled.input`
  border: 0;
  outline: 0;
  border-bottom: 1px solid black;
  font-size: inherit;
  font-weight: 300;
`;
const CompletionContainer = styled.div<{ isCompleted: boolean }>`
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  & > span:first-of-type {
    padding-right: 1rem;
    font-weight: 700;
  }
  & > span:last-of-type {
    cursor: pointer;
    font-weight: 300;
    padding: 0.25rem;
    color: ${({ isCompleted, theme }) => isCompleted && theme.color.primary};
  }
`;
const UserActionContainer = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  margin-top: 2rem;
`;
const CancelIconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  background-color: lightgray;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;
const EditConfirmButton = styled.button`
  flex: 10;
  border-radius: 0.5rem;
  border: none;
  background-color: ${({ theme }) => theme.color.primary};
  text-align: center;
  height: 100%;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.secondary};
  }
`;

function EditTodo() {
  const [todo, setTodo] = useState<TodoData>({
    id: 1,
    isCompleted: false,
    todo: "",
    userId: 1,
  });
  const { todos } = useOutletContext<TodoOuletContextType>();
  const { id } = useParams();
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const todo = todos.filter((todo) => todo.id === parseInt(id, 10))[0];
    setTodo(todo);
  }, [id, todos]);

  if (!todo) {
    return null;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(
        `/todos/${id}`,
        { todo: todo.todo, isCompleted: todo.isCompleted },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      navigate("/todo");
    } catch (err) {
      console.error(err);
    }
  };
  const handleClickCompleted = () => {
    setTodo((todo) => ({
      ...todo,
      isCompleted: !todo.isCompleted,
    }));
  };
  return (
    <Floating>
      <Container>
        <h1 style={{ marginBottom: "1rem" }}>투두 수정하기</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="todo"
              style={{ paddingRight: "1rem", fontWeight: "bold" }}
            >
              할 일
            </label>
            <StyledInput
              id="todo"
              type="text"
              value={todo.todo}
              onChange={(e) => {
                setTodo((todo) => ({ ...todo, todo: e.target.value }));
              }}
            />
          </div>
          <CompletionContainer isCompleted={todo.isCompleted}>
            <span>완료 여부</span>
            <span onClick={handleClickCompleted}>
              {todo.isCompleted ? " 완료로 표시" : "미완료로 표시"}
            </span>
          </CompletionContainer>
          <UserActionContainer>
            <CancelIconWrapper>
              <MdOutlineArrowBack
                onClick={() => {
                  navigate("/todo");
                }}
              />
            </CancelIconWrapper>
            <EditConfirmButton>수정하기</EditConfirmButton>
          </UserActionContainer>
        </form>
      </Container>
    </Floating>
  );
}

export default EditTodo;
