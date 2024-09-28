import { useAppSelector, useAppDispatch } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { fetchUser } from "../../../redux/slices/identificationSlice"; // получаем инструкции для изменений store
import { ItemForm } from "../../Items/ItemForm/ItemForm";
import { ItemLabel } from "../../Items/ItemLabel/ItemLabel";

export const RegistrationPage = () => {
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchUser());
  }

  return (
    <ItemForm submit={handleSubmit}>
      <ItemLabel title={"Полное имя"} type={"text"} />
      <ItemLabel title={"Login"} type={"text"} />
      <ItemLabel title={"Password"} type={"password"} />
      <ItemLabel title={"Email"} type={"email"} />
    </ItemForm>
  )
}
