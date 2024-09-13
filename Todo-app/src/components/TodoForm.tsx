import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

type AddTodoType = {
  todo: string;
};

type TodoTypes = {
  id: string;
  todo: string;
};

const TodoForm = ({ todos, setTodos}) => {
  const {register, handleSubmit } = useForm<AddTodoType>();
  // const [todos, setTodos] = useState<TodoTypes[]>([]);


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

  return (
    <div>
       <form className="max-w-md mx-auto" onSubmit={handleSubmit(addTodo)}>   
         
         <div className="relative">
             <input  {...register("todo")} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Todoを入力" required />
             <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">追加する</button>
         </div>
     </form>
      
    </div>
  )
}

export default TodoForm
