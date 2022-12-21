import "./App.css";
import TodoList from "./components/pages/TodoList";

function App() {
  //? первый стейт массив с объектами из дел, у каждого будет id и статус
  // const [todos, setTodos] = useState([]);

  //? функция удаления принимает id и отфильтровывает массив, так же прокидываем её ниже и вешаем на кнопочку козявочку
  // setTodos(todos.filter(todo => todo.id !== id));

  //? меняем статус дела в графе completed нажатим на чекбокс. при нажатии принимаем id и дальше логика такая перебираем массив дел и если id дела не равен принятому в параметры то ничего не делаем а если равен то берём развоарчиваем этот один объект дела и под ключём completed перезаписываем булеан значение противополжное текущему
  // setTodos(
  //   todos.map(todo => {
  //     if (todo.id !== id) return todo;
  //     return {
  //       ...todo,
  //       completed: !todo.completed,
  //     };
  //   })
  // );

  return <TodoList />;
}

export default App;
