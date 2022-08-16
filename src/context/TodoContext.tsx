import {
  useState,
  createContext,
  PropsWithChildren,
  useEffect,
  useContext,
} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

interface TodoData {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface TodoConterxtType {
  todos: TodoData[];
}
export const TodoContext = createContext<TodoConterxtType>({
  todos: [],
});

function TodoProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<TodoData[]>([]);

  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get<TodoData[]>("todos", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTodos(data);
    };
    if (getToken()) {
      getTodos();
    }
  }, [getToken]);

  return (
    <TodoContext.Provider value={{ todos }}>{children}</TodoContext.Provider>
  );
}

export default TodoProvider;
