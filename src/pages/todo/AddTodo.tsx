import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import Floating from "../../components/Floating";

import type { TodoOuletContextType } from "./Todo";

import { MdOutlineAdd } from "react-icons/md";

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledForm = styled.form`
  display: flex;
  align-items: center;
`;
const StyledInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.2rem;
  font-weight: 300;
`;

function AddTodo() {
  const [newTodo, setNewTodo] = useState("");
  const { setTodos } = useOutletContext<TodoOuletContextType>();
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };
  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleSubmitTodo = async () => {
    try {
      const { data } = await axios.post(
        "/todos",
        { todo: newTodo },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "access_token"
            )}`,
          },
        }
      );
      setTodos((todos) => [...todos, data]);
      setNewTodo("");
    } catch (err) {}
  };
  return (
    <Floating>
      <Container>
        <h2 style={{ marginBottom: "1rem" }}>새로운 할 일을 추가하세요</h2>
        <StyledForm onSubmit={handleSubmitEvent}>
          <StyledInput
            type="text"
            onChange={handleChange}
            value={newTodo}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                handleSubmitTodo();
              }
            }}
          />
          <MdOutlineAdd
            onClick={handleSubmitTodo}
            style={{
              fontSize: "1.5rem",
              color: theme.color.primary,
              cursor: "pointer",
            }}
          />
        </StyledForm>
      </Container>
    </Floating>
  );
}

export default AddTodo;
