import './App.css';
import { LoginPage } from './components/Pages/LoginPage/LoginPage';
import { useAppSelector } from "./hooks/index"; // получаем хуки для работы с глобальным store
import { Page404 } from './components/Pages/ErrorsPages/Page404/Page404';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/Pages/HomePage/HomePage';
import { ItemLink } from './components/Items/ItemLink/ItemLink';
import { RegistrationPage } from './components/Pages/RegistrationPage/RegistrationPage';
import { ModalPage } from './components/Pages/ModalPage/ModalPage';

function App() {
  const { error, auth } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища

  return (
    <div className="conteiner">

      <header>
        <div className="header_baner">
          <ul className="navigation header_navigation">
            <ItemLink link={"/"} label={"Главная"} />
            { auth ?
              <ItemLink link={"/logout"} label={"Выход"} /> :
              <ItemLink link={"/login"} label={"Вход"} />
            }
            <ItemLink link={"/registration"} label={"Регистрация"} />
          </ul>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>

      { error.status ? <ModalPage message={error.message} /> : '' }

    </div>
  )
}

export default App
