import { useAppSelector, useAppDispatch } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
// import { login, logout } from "../../../redux/slices/identificationSlice"; // получаем инструкции для изменений store
import './homePage.css';
import { ItemLink } from "../../Items/ItemLink/ItemLink";

export const HomePage = () => {
  // const value = useAppSelector((state) => state.identification.status); // хук useAppSelector принимает callback
  // // state.counter.value: здесь слово counter это поле name в нашем slice
  // const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  // const clickLogin = () => {
  //   dispatch(login()); // при данном событии активируем инструкцию для редьюсера
  // };

  const identification = useAppSelector((state) => state.identification.status); // хук useAppSelector принимает callback

  return (
    <>
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
          <ul className="navigation header_navigation">
            <ItemLink link={"/"} label={"Home"} />
            { identification ?
              <ItemLink link={"/logout"} label={"Выход"} /> :
              <ItemLink link={"/login"} label={"Вход"} />
            }
            <ItemLink link={"/registration"} label={"Регистрация"} />
          </ul>
        </div>
      </footer>
    </>
  )
}
