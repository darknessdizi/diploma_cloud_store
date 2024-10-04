import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { loginUser } from "../../../redux/slices/identificationSlice";
import { ItemForm } from "../../Items/ItemForm/ItemForm";
import { ItemLabel } from "../../Items/ItemLabel/ItemLabel";
import { checkLogin, checkPassword, checkValueInput } from "../RegistrationPage/utils";
import { useNavigate } from "react-router-dom";

// начальное состояние локального хранилища компонента
const initialState = {
  errorLogin: { status: false, message: '' },
  errorPassword: { status: false, message: '' },
  login: 'lizochka',
  password: '12QWer+',
}

export const LoginPage = () => {
  const { loginNotFound, auth } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера
  const [statePage, setStatePage] = useState(initialState); // создание локального хранилища
  const navigate = useNavigate();

  useEffect(() => { // срабатывает при изменении параметра auth
    if (auth) {
      navigate('/disk', { replace: true }) // перевод на другую страницу без её перезапуска
    }
  }, [auth]);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
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
      dispatch(loginUser(user));
    }
  }

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменение в поле input
    const value = checkValueInput(event, ['login', 'password']);
    setStatePage({ ...statePage, ...value });
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
    <div className="conteiner__form__background">
      <ItemForm submit={handleSubmit}>
        { loginNotFound.status ?
          <ItemLabel {...propsLogin} message={loginNotFound.message} error={loginNotFound.status} /> :
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
      </ItemForm>
    </div>
  )
}
