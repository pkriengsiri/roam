import React, { useState } from "react";
import { toISODateString } from "react-dates";

const PackingList = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodos("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add an item"
          value={todo}
          name="text"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>Add</button>
      </form>

      {todos.map((todo) => (
        <div>{todo.text}</div>
      ))}
    </div>
  );
};

export default PackingList;
