import React from "react";
import classes from "./MyButton.module.css";

//? передаем в children то что будет написано на кнопке и принимаем пропс в котором лежит переданный выше тип submit. Принимаем в параметрах распакованный пропс потому что передаём сюда в несколько параметров, например если бы это был только один тип деструкрутурировать было бы не нужно (см.пример в MyInput)
const MyButton = ({ children, ...props }) => {
  return (
    <>
      <button className={classes.myBtn} {...props}>
        {" "}
        {children}{" "}
      </button>
    </>
  );
};

export default MyButton;
