import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import MyButton from "../UI/MyButton/MyButton";
import MyInput from "../UI/MyInput/MyInput";
import { addTodo } from "../../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoList = () => {
  // ? второй стейт это сам текст который будет в объекте каждого дела
  const [text, setText] = useState("");

  //? диспатч это триггер который сообщает что произошло событие которое пора передать в редюсер
  const dispatch = useDispatch();

  function addBtnTodo(e) {
    e.preventDefault();
    //? вызывая диспатч передаём в него событие и поле из инпута
    dispatch(addTodo(text));
    setText("");
  }

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

  //? компонент MyInput изначально пустой т.к. переиспользуемый поэтому в него передаю просами параметры он их разворачивает в тело инпута
  //? компонент MyButton изначально пустой и тут вызывая его передаём в пропсы тип и в children то что будет написано в кнопке.
  return (
    <div style={container}>
      <div style={formBox}>
        <form action="">
          <MyInput
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="ввести todo"
            type="text"
          />
          <MyButton type="submit" onClick={addBtnTodo}>
            {" "}
            Добавить{" "}
          </MyButton>
        </form>
      </div>
      <TodoItem />
    </div>
  );
};

export default TodoList;
