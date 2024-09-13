
const TodoLists = ({ todos }) => {
  return (
    <>
      {todos.map( todo => (
      <li key={todo.id}>○{todo.todo}</li>
     ))}
    </>
  )
}

export default TodoLists
