import './App.css';
import { BasePage } from './components/BasePage/BasePage';
import { PopupLogin } from './components/PopupLogin/PopupLogin';
import { useAppSelector } from "./hooks/index"; // получаем хуки для работы с глобальным store

function App() {
  const identification = useAppSelector((state) => state.identification.status); // хук useAppSelector принимает callback

  return (
    <>
      { !identification ? <BasePage /> : <PopupLogin /> }
    </>
  )
}

export default App
