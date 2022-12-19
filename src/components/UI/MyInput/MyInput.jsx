import classes from "./MyInput.module.css";

//? в пропсах передаю placeholder и type
const MyInput = props => {
  return (
    <>
      <input {...props} className={classes.myInput} />
    </>
  );
};

export default MyInput;
