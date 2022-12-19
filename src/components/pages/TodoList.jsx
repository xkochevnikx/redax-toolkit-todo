import React from "react";
import MyButton from "../UI/MyButton/MyButton";
import MyInput from "../UI/MyInput/MyInput";

const TodoList = ({
  todos,
  addTodo,
  text,
  setText,
  deleteTodo,
  todoCompleted,
}) => {
  //? тут стили в переменной для напоминания что так можно, на компоненты сделаю стили через модули как у ulbi
  const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const formBox = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };
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

  //? компонент MyInput изначально пустой т.к. переиспользуемый поэтому в него передаю просами параметры он их разворачивает в тело инпута
  //? компонент MyButton изначально пустой и тут вызывая его передаём в пропсы тип и в children то что будет написано в кнопке.
  return (
    <div style={container}>
      <div style={formBox}>
        <form action="">
          <MyInput
            placeholder="ввести todo"
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <MyButton type="submit" onClick={addTodo}>
            {" "}
            Добавить{" "}
          </MyButton>
        </form>
      </div>
      <ul style={readBox}>
        {todos.map(todo => (
          <li style={listStyle} key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => todoCompleted(todo.id)}
            />
            <span>{todo.text}</span>
            <span style={deleteTodoBtn} onClick={() => deleteTodo(todo.id)}>
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
