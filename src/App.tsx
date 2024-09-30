import './App.css';
import { LoginPage } from './components/Pages/LoginPage/LoginPage';
import { useAppSelector } from "./hooks/index"; // получаем хуки для работы с глобальным store
import { Page404 } from './components/Pages/ErrorsPages/Page404/Page404';
import { Routes, Route, Switch} from 'react-router-dom';
import { HomePage } from './components/Pages/HomePage/HomePage';
import { ItemLink } from './components/Items/ItemLink/ItemLink';
import { RegistrationPage } from './components/Pages/RegistrationPage/RegistrationPage';

function App() {
  const identification = useAppSelector((state) => state.identification.status); // хук useAppSelector принимает callback

  return (
    <div className="conteiner">

      <header>
        <div className="header_baner">
          <ul className="navigation header_navigation">
            <ItemLink link={"/"} label={"Главная"} />
            { identification ?
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

    </div>
  )
}

export default App
