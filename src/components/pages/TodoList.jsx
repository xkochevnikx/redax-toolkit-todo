import React, { useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import MyButton from "../UI/MyButton/MyButton";
import MyInput from "../UI/MyInput/MyInput";
import { asyncAddTodo, fetchTodos } from "../../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  // ? второй стейт это сам текст который будет в объекте каждого дела
  const [text, setText] = useState("");

  const { status, error } = useSelector(state => state.todos);

  //? диспатч это триггер который сообщает что произошло событие которое пора передать в редюсер
  const dispatch = useDispatch();

  function addBtnTodo(e) {
    e.preventDefault();
    //? вызывая диспатч передаём в него событие и поле из инпута
    dispatch(asyncAddTodo(text));
    setText("");
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

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
  //? при первом рендере вызываем fetchTodos и он нам возвращает результат запроса на сервер, пока запрос идёт мы получаем статусы по ним отрабатывают экстраредюсеры и на основании того что отработают экстраредюсеры мы делаем условную отрисовку статуса загрузки. когда у нас pending то подгружаем надпись loading а если вылезет ошибка мы её отрисуем на главной
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
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error} </h2>}
      <TodoItem />
    </div>
  );
};

export default TodoList;
