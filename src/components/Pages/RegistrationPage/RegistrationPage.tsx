import { useAppSelector, useAppDispatch } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { registrationUser, changeUserParams } from "../../../redux/slices/identificationSlice"; // получаем инструкции для изменений store
import { ItemForm } from "../../Items/ItemForm/ItemForm";
import { ItemLabel } from "../../Items/ItemLabel/ItemLabel";
import "./registrationPage.css";
import { useState } from 'react';
import { checkEmail, checkLogin, checkPassword } from "./utils";

const typeErrors = {
  login: { status: false, message: '' },
  password: { status: false, message: '' },
  email: { status: false, message: '' },
}

export const RegistrationPage = () => {
  const [statusErrors, setStatusErrors] = useState(typeErrors);
  const { user } = useAppSelector((state) => state.identification); // хук useAppSelector принимает callback
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    // Обрабатываем отправку формы
    event.preventDefault();
    const errors = {
      login: checkLogin(event.target.login.value),
      password: checkPassword(event.target.password.value),
      email: checkEmail(event.target.email.value),
    }

    if ((!errors.login.status) && (!errors.password.status) && (!errors.email.status)) {
      dispatch(registrationUser(user));
    } else {
      setStatusErrors({ ...errors });
    }
  }

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменение в поле input
    const { name, value } = event.target;
    const statusSearch = ['fullName', 'login', 'password', 'email', 'repeat'].includes(name);

    if (statusSearch) {
      dispatch(changeUserParams({name, value}));
    }
  }

  return (
    <div className="conteiner__form__background form__background__long">
      <ItemForm submit={handleSubmit}>
        <h1 className="form__body__title">Регистрация</h1>
        <ItemLabel 
          title={"Логин"} 
          type={"text"} 
          name={"login"} 
          value={user.login || ""} 
          changeInput={changeInput} 
          message={statusErrors.login.message} 
          error={statusErrors.login.status} 
        />
        <ItemLabel 
          title={"Пароль"} 
          type={"password"} 
          name={"password"} 
          value={user.password || ""} 
          changeInput={changeInput} 
          message={statusErrors.password.message} 
          error={statusErrors.password.status} 
        />
        <ItemLabel 
          title={"Повторите пароль"} 
          type={"password"} name={"repeat"} 
          value={user.repeat || ""} 
          changeInput={changeInput} 
        />
        <ItemLabel 
          title={"Полное имя"} 
          type={"text"} 
          name={"fullName"} 
          value={user.fullName || ""} 
          changeInput={changeInput} 
        />
        <ItemLabel 
          title={"Электронная почта"} 
          type={"email"} 
          name={"email"} 
          value={user.email || ""} 
          changeInput={changeInput} 
          message={statusErrors.email.message} 
          error={statusErrors.email.status} 
        />
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
