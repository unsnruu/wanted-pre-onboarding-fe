import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import TodoItem from "../components/TodoItem";

interface TodoData {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

function Todo() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [newTodo, setNewTodo] = useState("");
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
        withCredentials: false,
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "todos",
        { todo: newTodo },
        {
          withCredentials: false,
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setTodos((prev) => [...prev, data]);
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  };
  const createDeleteHandler = (id: number) => async () => {
    try {
      await axios.delete(`/todos/${id}`, {
        withCredentials: false,
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Todos</h1>
      <button onClick={handleClickLogout}>로그아웃</button>
      <div>
        {todos.map(({ todo, id, isCompleted }) => (
          <TodoItem
            key={id}
            id={id}
            todo={todo}
            isCompleted={isCompleted}
            createDeleteHandler={createDeleteHandler}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button>새로운 투두 생성</button>
      </form>
    </div>
  );
}

export default Todo;
