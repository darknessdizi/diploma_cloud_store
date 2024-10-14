import { useAppDispatch, useAppSelector } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { logoutUser } from "../../../redux/slices/identificationSlice"; // получаем инструкции для изменений store
import './homePage.css';
import { ItemLink } from "../../Items/ItemLink/ItemLink";
import { ItemContentBlock } from "../../Items/ItemContentBlock/ItemContentBlock";
import { ItemImgBlock } from "../../Items/ItemImgBlock/ItemImgBlock";
import { ItemDescriptionBlock } from "../../Items/ItemDescriptionBlock/ItemDescriptionBlock";

export const HomePage = () => {
  const { auth } = useAppSelector((state) => state.identification); // хук useAppSelector принимает callback
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const onLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <>
      <main className="page_content">

        <ItemContentBlock>
            <h1 className="block_discription_title text_left">Cloud Store <span> - лучшее решение для работы с вашими файлами</span></h1>
        </ItemContentBlock>

        <ItemContentBlock>
          <ItemImgBlock imgPath="./2.png" />
          <ItemDescriptionBlock>
            <h1 className="block_discription_title">Cloud Store <span> - загружайте, просматривайте, редактируйте и скачивайте ваши файлы с любых устройств</span></h1>
          </ItemDescriptionBlock>
        </ItemContentBlock>

        <ItemContentBlock>
          <ItemDescriptionBlock>
            <h1 className="block_discription_title text_left">Cloud Store <span> - вы всегда будете иметь доступ к вашим файлам будь вы дома, на работе или в движении</span></h1>
          </ItemDescriptionBlock>
          <ItemImgBlock imgPath="./4.jpg" />
        </ItemContentBlock>

      </main>

      <footer>
        <div className="navigation footer_navigation">
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
      </footer>
    </>
  )
}
