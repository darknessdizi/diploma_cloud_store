import { useAppSelector, useAppDispatch } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { fetchUser } from "../../../redux/slices/identificationSlice"; // получаем инструкции для изменений store
import { ItemLabel } from "../../Items/ItemLabel/ItemLabel";
import './loginPage.css';

export const LoginPage = () => {
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchUser());
  }

  return (
    <div className="conteiner__login">
      <form className="form__login" onSubmit={handleSubmit}>
        <ItemLabel title={"Login"} type={"text"} />
        <ItemLabel title={"Password"} type={"password"} />
        <button type="submit" className="form__btn">Войти</button>
      </form>
    </div>
  )
}
