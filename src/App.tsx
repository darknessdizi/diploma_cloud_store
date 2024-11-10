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
import { logoutUser, setAuthFalse, setAuthTrue, succesAuth } from './redux/slices/identificationSlice';
import { baseFetch } from './utils/index';
import { MY_PATH } from './const/index';
import { runModal } from './redux/slices/modalSlice';
import { clearDisk } from './redux/slices/diskSlice';
import './App.css';

function App() {
  const { auth } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const { modal } = useAppSelector((state) => state.modal); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    if ((token !== 'undefined') && (token !== null)) {
      dispatch(setAuthTrue());
      const response = baseFetch({ url: `${import.meta.env.VITE_BACKEND_URL}/api/recovery-session/` });
      response.then(
        (res) => dispatch(succesAuth(res)),
        (err) => dispatch(runModal({ type: 'error', message: err.message }))
      )
    } 
    setChecked(true);
  }, []);

  const onLogout = async () => {
    try {
      dispatch(setAuthFalse());
      const response = await baseFetch({ url: `${import.meta.env.VITE_BACKEND_URL}/api/logout/` });
      if (response.status) {
        dispatch(logoutUser());
        dispatch(clearDisk());
      }
    } catch (e: any) {
      dispatch(runModal({ type: 'error', message: e.message }));
    }
  }

  if (!checked) return null;

  return (
    <div className="conteiner">

      <header>
        <div className="header_baner">
          <ul className="navigation ul_navigation">
            <ItemLink link={MY_PATH.root} label={"Главная"} />
            { auth ?
              <>
                <ItemLink link={MY_PATH.disk} label={"Диск"} />
                <ItemLink link={MY_PATH.login} label={"Выход"} logout={onLogout} />
              </> :
              <>
                <ItemLink link={MY_PATH.login} label={"Вход"} />
                <ItemLink link={MY_PATH.registration} label={"Регистрация"} />
              </>
            }
          </ul>
        </div>
      </header>

      <Routes>
        <Route path={MY_PATH.root} element={<HomePage />} />
        <Route path={MY_PATH.login} element={<LoginPage />} />
        <Route path={MY_PATH.registration} element={<RegistrationPage />} />
        <Route path={MY_PATH.disk} element={<DiskPage />} />
        <Route path={MY_PATH.all} element={<Page404 />} />
      </Routes>

      { modal ? <ItemModal /> : '' }

    </div>
  )
}

export default App
