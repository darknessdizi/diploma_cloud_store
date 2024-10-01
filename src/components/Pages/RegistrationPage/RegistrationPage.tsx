import { useAppSelector, useAppDispatch } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { registrationUser, changeUserParams } from "../../../redux/slices/identificationSlice"; // получаем инструкции для изменений store
import { ItemForm } from "../../Items/ItemForm/ItemForm";
import { ItemLabel } from "../../Items/ItemLabel/ItemLabel";
import "./registrationPage.css";
import { useState } from 'react';
import { checkEmail, checkLogin, checkPassword } from "./utils";

const initialState = {
  errorLogin: { status: false, message: '' },
  errorPassword: { status: false, message: '' },
  errorRepeat: { status: false, message: '' },
  errorEmail: { status: false, message: '' },
  login: '',
  password: '',
  repeat: '',
  email: '',
  fullName: '',
}

export const RegistrationPage = () => {
  const [statePage, setStatePage] = useState(initialState);
  const { user } = useAppSelector((state) => state.identification); // хук useAppSelector принимает callback
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    // Обрабатываем отправку формы регистрации
    event.preventDefault();
    const { login, password, repeat, email } = event.target;
    const errors = {
      errorLogin: checkLogin(login.value),
      errorPassword: checkPassword(password.value),
      errorRepeat: (repeat.value === password.value) ? initialState.errorRepeat : { status: true, message: 'Ошибка в пароле' },
      errorEmail: checkEmail(email.value),
    }

    setStatePage({ 
      ...statePage,
      ...errors
    });

    if ((!errors.errorLogin.status) && (!errors.errorPassword.status) && (!errors.errorRepeat.status) && (!errors.errorEmail.status)) {
      dispatch(registrationUser(user));
    }
  }

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменение в поле input
    const { name, value } = event.target;
    const statusSearch = ['fullName', 'login', 'password', 'email', 'repeat'].includes(name);

    if (statusSearch) {
      // dispatch(changeUserParams({name, value}));
      setStatePage({ 
        ...statePage,
        [name]: value,
      });
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
          value={statePage.login} 
          changeInput={changeInput} 
          message={statePage.errorLogin.message} 
          error={statePage.errorLogin.status} 
        />
        <ItemLabel 
          title={"Пароль"} 
          type={"password"} 
          name={"password"} 
          value={statePage.password} 
          changeInput={changeInput} 
          message={statePage.errorPassword.message} 
          error={statePage.errorPassword.status} 
        />
        <ItemLabel 
          title={"Повторите пароль"} 
          type={"password"} 
          name={"repeat"} 
          value={statePage.repeat} 
          changeInput={changeInput}
          message={statePage.errorRepeat.message} 
          error={statePage.errorRepeat.status}
        />
        <ItemLabel 
          title={"Полное имя"} 
          type={"text"} 
          name={"fullName"} 
          value={statePage.fullName} 
          changeInput={changeInput} 
        />
        <ItemLabel 
          title={"Электронная почта"} 
          type={"email"} 
          name={"email"} 
          value={statePage.email} 
          changeInput={changeInput} 
          message={statePage.errorEmail.message} 
          error={statePage.errorEmail.status} 
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
