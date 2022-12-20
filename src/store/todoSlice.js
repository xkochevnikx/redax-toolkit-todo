import { createSlice } from "@reduxjs/toolkit";

//? создаём срез у которого есть имя и изначальное состояние стейт в виде объекта у которого под ключём todos лежит массив наших дел
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  //?
  reducers: {
    //? это методы которые заменяют функции
    addTodo(state, action) {
      state.todos.push({
        text: action.payload,
        id: Date.now(),
        completed: false,
      });
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    todoCompleted(state, action) {
      const todoComp = state.todos.find(todo => todo.id === action.payload);
      console.log(todoComp);
      todoComp.completed = !todoComp.completed;
    },
  },
});
//? что бы эспортировать методы достаточно написать такое
export const { addTodo, deleteTodo, todoCompleted } = todoSlice.actions;
//? эспортируем срез  и в индексе его принимаем
export default todoSlice.reducer;
