import { useAppDispatch, useAppSelector } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { clearLoginOccupied, addLoginOccupied, succesAuth } from "../../../redux/slices/identificationSlice"; // получаем инструкции для изменений store
import { ItemForm } from "../../Items/ItemForm/ItemForm";
import { ItemLabel } from "../../Items/ItemLabel/ItemLabel";
import { useEffect, useState } from 'react';
import { checkEmail, checkLogin, checkPassword, checkValueInput } from "./utils";
import { baseFetch } from "../../../utils/index";
import { URL_SERVER } from "../../../const/index";
import { runModal } from "../../../redux/slices/modalSlice";
import "./registrationPage.css";
import { useNavigate } from "react-router-dom";

// начальное состояние локального хранилища компонента
const initialState = {
  errorLogin: { status: false, message: '' },
  errorPassword: { status: false, message: '' },
  errorRepeat: { status: false, message: '' },
  errorEmail: { status: false, message: '' },
  errorSex: { status: false, message: '' },
  login: 'lizochka',
  password: '12QWER+',
  repeat: '12QWER+',
  email: 'lizka@mail.ru ',
  fullName: 'Лизочка Клевая',
  sex: '',
}

export const RegistrationPage = () => {
  const { loginOccupied, auth } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const [statePage, setStatePage] = useState(initialState); // создание локального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера
  const navigate = useNavigate();

  useEffect(() => { // срабатывает при изменении параметра auth
    if (auth) {
      navigate('/disk', { replace: true }) // перевод на другую страницу без её перезапуска
    }
  }, [auth]);

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    // Обрабатываем отправку формы регистрации
    event.preventDefault();
    dispatch(clearLoginOccupied());
    const { login, password, repeat, email } = event.target;
    const errors = {
      errorLogin: checkLogin(login.value),
      errorPassword: checkPassword(password.value),
      errorRepeat: (repeat.value === password.value) ? initialState.errorRepeat : { status: true, message: 'Ошибка в пароле' },
      errorEmail: checkEmail(email.value),
      errorSex: (statePage.sex === '') ? { status: true, message: 'Укажите Ваш пол' } : initialState.errorSex,
    }

    setStatePage({ ...statePage, ...errors });

    if (
      (!errors.errorLogin.status) &&
      (!errors.errorPassword.status) &&
      (!errors.errorRepeat.status) &&
      (!errors.errorEmail.status) &&
      (!errors.errorSex.status)
    ) {
      const user = {
        login: statePage.login,
        fullName: statePage.fullName,
        email: statePage.email,
        password: statePage.password,
        sex: statePage.sex,
      }

      try {
        const response = await baseFetch({ url: `${URL_SERVER}/registration/`, method: "POST", body: JSON.stringify(user) });
        if (response.status === 205) {
          return dispatch(addLoginOccupied());
        }
        dispatch(succesAuth(response));
        dispatch(runModal({ type: 'registration', message: 'Вы успешно зарегистрированы!' }));
      } catch (e: any) {
        dispatch(runModal({ type: 'error', message: e.message }));
      }
    }
  }

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменение в поле input
    const value = checkValueInput(event, ['fullName', 'login', 'password', 'email', 'repeat']);
    setStatePage({ ...statePage, ...value });
  }

  const changeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменения радиокнопки
    event.target.checked = true;
    statePage.sex = event.target.value;
  }

  const propsLogin = {
    title: "Логин", 
    type: "text",
    name: "login",
    value: statePage.login,
    changeInput: changeInput,
    message: statePage.errorLogin.message,
    error: statePage.errorLogin.status,
  }

  return (
    <div className="conteiner__form__background form__background__long">
      <ItemForm submit={handleSubmit}>
        <h1 className="form__body__title">Регистрация</h1>

        { loginOccupied ?
          <ItemLabel {...propsLogin} message={'Логин уже существует'} error={true} /> :
          <ItemLabel {...propsLogin} />
        }

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

        <div className="form__content__sex">
          <label className="content__label__sex">
            <span className="input__label__title">Мужчина</span>
            <input className="input__radio" type="radio" name="sex" value="man" onChange={changeRadio}></input>
          </label>
          <label className="content__label__sex">
            <span className="input__label__title">Женщина</span>
            <input  className="input__radio" type="radio" name="sex" value="woman" onChange={changeRadio}></input>
          </label>
        </div>
        <div className="input__message__error">
            { statePage.errorSex.status ? <span className="message__active">{statePage.errorSex.message}</span> : "" }
        </div>

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
