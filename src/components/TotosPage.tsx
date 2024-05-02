import { FC, useEffect, useState } from "react";
import { ITodo } from "../types/types";
import axios from "axios";
import List from "./List";
import TodoItem from "./TodoItem";

const URL_TODOS = "https://jsonplaceholder.typicode.com/todos?_limit=8";

const TodosPage: FC = (props) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await axios.get<ITodo[]>(URL_TODOS);
      setTodos(response.data);
    } catch (e) {
      console.log("произошла ошибка при загрузке списка дел: ", e);
    }
  }

  return (
    <List
      items={todos}
      renderItem={(todo) => <TodoItem key={todo.id} todo={todo} />}
    />
  );
};

export default TodosPage;
