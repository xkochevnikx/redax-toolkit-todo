import { useState } from "react";
import "./App.css";
import TodoList from "./components/pages/TodoList";

function App() {
  //? первый стейт массив с объектами из дел, у каждого будет id и статус
  const [todos, setTodos] = useState([]);
  console.log(todos);
  // ? второй стейт это сам текст который будет в объекте каждого дела
  const [text, setText] = useState("");

  //? дальше функция создания переменной объекта и запись её в стейт массива дел todos
  function addTodo(e) {
    e.preventDefault();
    if (text.trim().length) {
      setTodos([
        ...todos,
        {
          text,
          id: Date.now(),
          completed: false,
        },
      ]);
      setText("");
    }
  }
  //? функция удаления принимает id и отфильтровывает массив, так же прокидываем её ниже и вешаем на кнопочку козявочку
  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  //? меняем статус дела в графе completed нажатим на чекбокс. при нажатии принимаем id и дальше логика такая перебираем массив дел и если id дела не равен принятому в параметры то ничего не делаем а если равен то берём развоарчиваем этот один объект дела и под ключём completed перезаписываем булеан значение противополжное текущему
  function todoCompleted(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          completed: !todo.completed,
        };
      })
    );
  }
  //? прокидываю пропсами функцию добавления в массив и связываю стейт текста с инпутом тоже прокидывая всё ниже пропсами, ниже в todolist я передам пропсами эти данные в переиспользуемые компоненты
  return (
    <TodoList
      todos={todos}
      addTodo={addTodo}
      text={text}
      setText={setText}
      deleteTodo={deleteTodo}
      todoCompleted={todoCompleted}
    />
  );
}

export default App;
