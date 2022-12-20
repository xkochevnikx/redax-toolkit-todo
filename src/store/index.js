import { configureStore } from "@reduxjs/toolkit";
//? принимаем срез и вставляем под ключём todos
import todoSlice from "./todoSlice";

//? это глобальный стейт облако в котором есть свои "срезы"/"редюсеры" он передаётся пропсом в провайдёр в который обёрнуто всё приложение app
export default configureStore({
  //? под ключём reducer лежат срезы их может быть много
  reducer: {
    todos: todoSlice,
  },
});
