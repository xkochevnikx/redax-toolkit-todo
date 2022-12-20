import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, todoCompleted } from "../../store/todoSlice";

const TodoItem = () => {
  const todos = useSelector(state => state.todos.todos);

  const dispatch = useDispatch();

  const readBox = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  const listStyle = {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };
  const deleteTodoBtn = {
    color: "red",
    fontWeight: "bold",
    fontSize: "20px",
    cursor: "pointer",
  };
  return (
    <>
      <ul style={readBox}>
        {todos.map(todo => (
          <li style={listStyle} key={todo.id}>
            <input
              type="checkbox"
              onChange={() => dispatch(todoCompleted(todo.id))}
            />
            <span>{todo.text}</span>
            <span
              onClick={() => dispatch(deleteTodo(todo.id))}
              style={deleteTodoBtn}>
              &times;
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoItem;
