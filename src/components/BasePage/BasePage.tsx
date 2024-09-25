import { useAppSelector, useAppDispatch } from "../../hooks/index"; // получаем хуки для работы с глобальным store
import { login, logout } from "../../redux/slices/identificationSlice"; // получаем инструкции для изменений store

export const BasePage = () => {
  const value = useAppSelector((state) => state.identification.status); // хук useAppSelector принимает callback
  // state.counter.value: здесь слово counter это поле name в нашем slice
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const clickLogin = (event) => {
    dispatch(login()); // при данном событии активируем инструкцию для редьюсера
  };

  return (
    <div className="conteiner">
      <header>
        <div className="header_baner">
          <div className="navigation header_navigation">
            <button className="navigation_button login" onClick={clickLogin}>Вход</button>
            <button className="navigation_button logout hidden">Выход</button>
            <button className="navigation_button registration">Регистрация</button>
          </div>
        </div>
      </header>

      <main className="page_content">

        <div className="content_block">
          <div className="block_discription">
            <h1 className="block_discription_title">Cloud Store <span> - лучшее решение для работы с Вашими файлами</span></h1>
          </div>
          <div className="block_img">
            <img src="./15.jpg" alt="Изображение облачного хранилища" />
          </div>
        </div>

        <div className="content_block">
          <div className="block_discription">
            <h1 className="block_discription_title">Cloud Store <span> - лучшее решение для работы с Вашими файлами</span></h1>
          </div>
          <div className="block_img">
            <img src="./15.jpg" alt="Изображение облачного хранилища" />
          </div>
        </div>

        <div className="content_block">
          <div className="block_discription">
            <h1 className="block_discription_title">Cloud Store <span> - лучшее решение для работы с Вашими файлами</span></h1>
          </div>
          <div className="block_img">
            <img src="./15.jpg" alt="Изображение облачного хранилища" />
          </div>
        </div>

      </main>

      <footer>
        <div className="navigation footer_navigation">
          <button className="navigation_button login">Вход</button>
          <button className="navigation_button logout hidden">Выход</button>
          <button className="navigation_button registration">Регистрация</button>
        </div>
      </footer>
    </div>
  )
}
