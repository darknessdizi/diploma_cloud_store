import { LoginPage } from './components/Pages/LoginPage/LoginPage';
import { useAppDispatch, useAppSelector } from "./hooks/index"; // получаем хуки для работы с глобальным store
import { Page404 } from './components/Pages/ErrorsPages/Page404/Page404';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/Pages/HomePage/HomePage';
import { ItemLink } from './components/Items/ItemLink/ItemLink';
import { RegistrationPage } from './components/Pages/RegistrationPage/RegistrationPage';
import { DiskPage } from './components/Pages/DiskPage/DiskPage';
import { useEffect, useState } from 'react';
import { ItemModal } from './components/Items/ItemModal/ItemModal';
import './App.css';
import { logoutUser, setAuthFalse, setAuthTrue, succesAuth } from './redux/slices/identificationSlice';
import { baseFetch } from './utils/index';
import { URL_SERVER } from './const/index';
import { runModal } from './redux/slices/modalSlice';

function App() {
  const { auth } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const { modal } = useAppSelector((state) => state.modal); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера
  const token = localStorage.getItem('sessionToken');
  console.log('token', token, auth)
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log('одноразовый хук', 'auth=', auth)
    if ((token !== 'undefined') && (token !== null)) {
      dispatch(setAuthTrue());
      const response = baseFetch({ url: `${URL_SERVER}/recovery-session/`, headers: { 'Authorization': token } });
      response.then(
        (res) => dispatch(succesAuth(res)),
        (err) => dispatch(runModal({ type: 'error', message: err.message }))
      )
    } 
    setChecked(true);
  }, []);

  // useEffect(() => {
  //   // fetch('http://127.0.0.1:8000/csrf/')
  //   // const token = localStorage.getItem('sessionToken');
  //   console.log('запуск хук', auth)
  //   if ((token !== 'undefined') && (token !== null)) {
  //     // console.log('app', auth)
  //     dispatch(setAuthTrue());
  //     // console.log('app', auth)
  //     const response = baseFetch({ url: `${URL_SERVER}/recovery-session/`, headers: { 'Authorization': token } });
  //     response.then(
  //       (res) => {
  //         dispatch(succesAuth(res));
  //         setChecked(true);
  //       },
  //       (err) => {
  //         dispatch(runModal({ type: 'error', message: err.message }));
  //         setChecked(true);
  //       }
  //     )
  //   } else {
  //     setChecked(true);
  //   }
  // }, [auth]);

  const onLogout = async () => {
    dispatch(setAuthFalse());
    const response = await baseFetch({ url: `${URL_SERVER}/logout/`, headers: { 'Authorization': token } });
    if (response.status) {
      dispatch(logoutUser());
    }
  }

  // useEffect(() => {
  //   // fetch('http://127.0.0.1:8000/csrf/')
  //   // const token = localStorage.getItem('sessionToken');
  //   if ((token !== 'undefined') && (token !== null)) {
  //     console.log('app', auth)
  //     dispatch(setAuthTrue());
  //     console.log('app', auth)
  //     const response = baseFetch({ url: `${URL_SERVER}/recovery-session/`, headers: { 'Authorization': token } });
  //     response.then(
  //       (res) => dispatch(succesAuth(res)),
  //       (err) => dispatch(runModal({ type: 'error', message: err.message }))
  //     )
  //   }
  // }, []);

  if (!checked) return null;

  return (
    <div className="conteiner">

      <header>
        <div className="header_baner">
          <ul className="navigation header_navigation">
            <ItemLink link={"/"} label={"Главная"} />
            { auth ?
              <>
                <ItemLink link={"/disk"} label={"Диск"} />
                <ItemLink link={"/login"} label={"Выход"} logout={onLogout} />
              </> :
              <>
                <ItemLink link={"/login"} label={"Вход"} />
                <ItemLink link={"/registration"} label={"Регистрация"} />
              </>
            }
          </ul>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/disk" element={<DiskPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>

      { modal ? <ItemModal /> : '' }

    </div>
  )
}

export default App
