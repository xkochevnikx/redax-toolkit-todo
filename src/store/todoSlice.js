import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//? эту функцию буду использовать в дальнейшем как экшн. она будет возвращать список дел с сервера и ее смогу передать в параметры action.payload. точнее результат будет возвращать createAsyncThunk и дальше это сохраняем в fetchTodos. функ это функция которая возвращается из другой функции. в данном случае она принимает название и асинхронную функцию
export const fetchTodos = createAsyncThunk(
  //? первый парамерт это имя, второй это асинхронная функция
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) {
        throw new Error("йцукенгш");
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

//? создаём асинхронную функцию удаления которую будем вызывать в аргументе диспатча. вызывая мидлвэйр он делает запрос на удаление на сервере если все ок то после этого сразу вызываем диспатч внутри и удаляем дело локально в сторе через стандартные методы которые вместо функций
export const asyncDeleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("can/t delete task");
      }
      dispatch(deleteTodo(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? создаю функцию изменения статуса completed в нашем элементе дела , всё так же как и в функции удаления только отличается метод запроса и в параметре body используется переменная в которую методом getState был получен тот объект id которого мы передаём в функцию при вызове

export const asyncTodoCompleted = createAsyncThunk(
  "todos/asyncTodoCompleted",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find(todo => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !todo.completed }),
        }
      );

      if (!response.ok) {
        throw new Error("Can`t toggle status");
      }

      dispatch(todoCompleted(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncAddTodo = createAsyncThunk(
  "todos/asyncAddTodo",
  async function (text, { rejectWithValue, dispatch }) {
    const newTodo = {
      title: text,
      userId: 1,
      completed: false,
    };
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
        }
      );

      if (!response.ok) {
        throw new Error("Can`t add task");
      }

      const data = await response.json();

      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? хелпер
const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

//? создаём срез у которого есть имя и изначальное состояние стейт в виде объекта у которого под ключём todos лежит массив наших дел
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  //?
  reducers: {
    //? это методы которые заменяют функции
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    todoCompleted(state, action) {
      const todoComp = state.todos.find(todo => todo.id === action.payload);
      todoComp.completed = !todoComp.completed;
    },
  },
  //? это по сути тоже методы вместо функций только они реагируют на возвращаемое значение асинхронной функции
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    //? когда функция fetchTodos вернёт массив и результат будет fulfilled то статус меняется и стейт тудус перезаписывается на этот массив переданный экшенем в диспатч
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [asyncDeleteTodo.rejected]: setError,
    [asyncTodoCompleted.rejected]: setError,
  },
});
//? что бы эспортировать методы достаточно написать такое. нет слова экспорт потому что нам нужны эти константы на локальном уровне
const { addTodo, deleteTodo, todoCompleted } = todoSlice.actions;
//? эспортируем срез  и в индексе его принимаем
export default todoSlice.reducer;
