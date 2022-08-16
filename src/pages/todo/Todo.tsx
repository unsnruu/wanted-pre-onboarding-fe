import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

import { AuthContext } from "../../context/AuthContext";
import TodoItem from "../../components/Todo/TodoItem";
import Header from "../../components/Header";

const Container = styled.div`
  position: relative;
`;

export interface TodoData {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
export interface TodoOuletContextType {
  todos: TodoData[];
  setTodos: React.Dispatch<React.SetStateAction<TodoData[]>>;
}

function Todo() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const navigate = useNavigate();
  const { logout, isLoggedIn, getToken } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get<TodoData[]>("todos", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTodos(data);
    };
    getTodos();
  }, [getToken, navigate]);

  const handleClickLogout = () => {
    logout();
    navigate("/");
  };

  const createDeleteHandler = (id: number) => async () => {
    try {
      await axios.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Header handleClickLogout={handleClickLogout} />
      <div>
        {todos.map(({ id, isCompleted, todo }) => (
          <TodoItem
            key={id}
            id={id}
            todo={todo}
            isCompleted={isCompleted}
            createDeleteHandler={createDeleteHandler}
          />
        ))}
      </div>
      <Outlet context={{ todos, setTodos }} />
    </Container>
  );
}

export default Todo;
