import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type TodoTypes = {
  id: string;
  todo: string;
};

type AddTodoType = {
  todo: string;
};


function App() {
  const {register, handleSubmit } = useForm<AddTodoType>();
  const [todos, setTodos] = useState<TodoTypes[]>([]);

  const addTodo = async (event: AddTodoType) => {
    const { todo } = event;
    await axios
      .post("http://localhost:3000/add", {
        data: {
          todo,
        },
      })
      .then((response) => {
        const todo = response.data;
        setTodos((preTodos) => [todo, ...preTodos]);
      })
      .catch((error) => {
         console.log(error);
      })
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((response) => {
        console.log(response.data.todos);
        const { todos } = response.data;
        setTodos(todos);
      });
  }, []);

  return (
    <>
     <form onSubmit={handleSubmit(addTodo)}>
        <input {...register("todo")} type="text" />
        <button type="submit">add</button>
     </form>
     {todos.map((todo) => (
      <p key={todo.id}>{todo.todo}</p>
     ))}
    </>
  );
}

export default App;