import { useAppSelector, useAppDispatch } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { registrationUser, changeUserParams } from "../../../redux/slices/identificationSlice"; // получаем инструкции для изменений store
import { ItemForm } from "../../Items/ItemForm/ItemForm";
import { ItemLabel } from "../../Items/ItemLabel/ItemLabel";
import "./registrationPage.css"

export const RegistrationPage = () => {
  const { user } = useAppSelector((state) => state.identification); // хук useAppSelector принимает callback
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    // Обрабатываем отправку формы
    event.preventDefault();
    dispatch(registrationUser(user));
  }

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменение в поле input
    const { name, value } = event.target;
    const statusSearch = ['fullName', 'login', 'password', 'email'].includes(name);

    if (statusSearch) {
      dispatch(changeUserParams({name, value}));
    }
  }

  return (
    <div className="conteiner__form__background form__background__long">
      <ItemForm submit={handleSubmit}>
        <h1 className="form__body__title">Регистрация</h1>
        <ItemLabel title={"Login"} type={"text"} name={"login"} value={user.login || ""} changeInput={changeInput} message={"Некорректный логин"} />
        <ItemLabel title={"Password"} type={"password"} name={"password"} value={user.password || ""} changeInput={changeInput} message={"Некорректный пароль"} />
        <ItemLabel title={"Password"} type={"password"} name={"password"} value={user.password || ""} changeInput={changeInput} message={"Некорректный пароль"} />
        <ItemLabel title={"Полное имя"} type={"text"} name={"fullName"} value={user.fullName || ""} changeInput={changeInput} />
        <ItemLabel title={"Email"} type={"email"} name={"email"} value={user.email || ""} changeInput={changeInput} message={"Некорректный email"} />
      </ItemForm>
      <div className="conteiner__form__description">
        <ul>Требования к заполнению:</ul>
          <li>Логин состоит только из латинских букв и цифр, первый символ обязательно буква, длина от 4 до 20 символов.</li>
          <li>Пароль должен содержать не менее 6 символов, включающий как минимум одну заглавную букву, одну цифру и один специальный символ.</li>
          <li>E-mail должен соответствовать формату для адресов электронной почты.</li>
      </div>
    </div>
  )
}
