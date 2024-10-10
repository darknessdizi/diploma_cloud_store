import { LoginPage } from './components/Pages/LoginPage/LoginPage';
import { useAppSelector } from "./hooks/index"; // получаем хуки для работы с глобальным store
import { Page404 } from './components/Pages/ErrorsPages/Page404/Page404';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/Pages/HomePage/HomePage';
import { ItemLink } from './components/Items/ItemLink/ItemLink';
import { RegistrationPage } from './components/Pages/RegistrationPage/RegistrationPage';
import { DiskPage } from './components/Pages/DiskPage/DiskPage';
import { useEffect } from 'react';
import { ItemModal } from './components/Items/ItemModal/ItemModal';
import './App.css';

function App() {
  const { auth } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const { modal } = useAppSelector((state) => state.modal); // получение данных из глобального хранилища

  useEffect(() => {
    fetch('http://127.0.0.1:8000/csrf/')
  }, []);

  return (
    <div className="conteiner">

      <header>
        <div className="header_baner">
          <ul className="navigation header_navigation">
            <ItemLink link={"/"} label={"Главная"} />
            { auth ?
              <>
                <ItemLink link={"/disk"} label={"Диск"} />
                <ItemLink link={"/logout"} label={"Выход"} />
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
