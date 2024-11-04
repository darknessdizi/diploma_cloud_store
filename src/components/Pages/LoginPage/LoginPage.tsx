import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { ItemForm } from "../../Items/ItemForm/ItemForm";
import { ItemLabel } from "../../Items/ItemLabel/ItemLabel";
import { checkLogin, checkPassword, checkValueInput } from "../RegistrationPage/utils";
import { useNavigate } from "react-router-dom";
import { MY_PATH, URL_SERVER } from "../../../const/index";
import { baseFetch } from "../../../utils/index";
import { runModal } from "../../../redux/slices/modalSlice";
import { setAuthTrue, succesAuth } from "../../../redux/slices/identificationSlice";

// начальное состояние локального хранилища компонента
const initialState = {
  errorLogin: { status: false, message: '' },
  errorPassword: { status: false, message: '' },
  // login: 'lizochka',
  // password: '12QWer+',
  login: 'admin',
  password: '12QWer+',
}

export const LoginPage = () => {
  const { auth } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера
  const [statePage, setStatePage] = useState(initialState); // создание локального хранилища
  const navigate = useNavigate();

  useEffect(() => { // срабатывает при изменении параметра auth
    if (auth) {
      navigate(MY_PATH.disk, { replace: true }) // перевод на другую страницу без её перезапуска
    }
  }, [auth]);

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    // отправка формы авторизации пользователя (вход в систему)
    event.preventDefault();
    const { login, password } = event.target;
    const errors = {
      errorLogin: checkLogin(login.value),
      errorPassword: checkPassword(password.value),
    }

    setStatePage({ ...statePage, ...errors });

    if ((!errors.errorLogin.status) && (!errors.errorPassword.status)) {
      const user = {
        login: statePage.login,
        password: statePage.password,
      }
      try {
        const response = await baseFetch({ url: `${URL_SERVER}/login/`, method: "POST", body: JSON.stringify(user) });
        dispatch(succesAuth(response));
        dispatch(setAuthTrue());
      } catch (e: any) {
        dispatch(runModal({ type: 'error', message: e.message }));
      }
    }
  }

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменение в поле input
    const value = checkValueInput(event, ['login', 'password']);
    setStatePage({ ...statePage, ...value });
  }

  return (
    <div className="conteiner__form__background">
      <ItemForm submit={handleSubmit}>
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
      </ItemForm>
    </div>
  )
}
