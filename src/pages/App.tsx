import React from "react";
import { Routes, Route } from "react-router-dom";

import NotFound from "./404";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Home from "./Home";
import Todo from "./todo/Todo";
import AddTodo from "./todo/AddTodo";
import EditTodo from "./todo/EditTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth">
        <Route index element={<NotFound />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
      <Route path="todo" element={<Todo />}>
        <Route index element={<AddTodo />} />
        <Route path="edit/:id" element={<EditTodo />}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
