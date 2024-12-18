import { useAppDispatch, useAppSelector } from "../../../hooks/index"; // получаем хуки для работы с глобальным store
import { logoutUser, setAuthFalse } from "../../../redux/slices/identificationSlice"; // получаем инструкции для изменений store
import { ItemLink } from "../../Items/ItemLink/ItemLink";
import { ItemContentBlock } from "../../Items/ItemContentBlock/ItemContentBlock";
import { ItemImgBlock } from "../../Items/ItemImgBlock/ItemImgBlock";
import { ItemDescriptionBlock } from "../../Items/ItemDescriptionBlock/ItemDescriptionBlock";
import { clearDisk } from "../../../redux/slices/diskSlice";
import { baseFetch } from "../../../utils/index";
import { MY_PATH } from "../../../const/index";
import { runModal } from "../../../redux/slices/modalSlice";
// import img1 from "../../../../public/img1.png"; // для GitHub только
// import img2 from "../../../../public/img2.jpg";
import './homePage.css';

export const HomePage = () => {
  const { auth } = useAppSelector((state) => state.identification); // хук useAppSelector принимает callback
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

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

  return (
    <>
      <main className="page_content">

        <ItemContentBlock>
            <h1 className="block_discription_title text_left">Cloud Store <span> - лучшее решение для работы с вашими файлами</span></h1>
        </ItemContentBlock>

        <ItemContentBlock>
          <ItemImgBlock imgPath="./img1.png" />
          {/* <ItemImgBlock imgPath={img1} /> */}
          <ItemDescriptionBlock>
            <h1 className="block_discription_title">Cloud Store <span> - загружайте, просматривайте, редактируйте и скачивайте ваши файлы с любых устройств</span></h1>
          </ItemDescriptionBlock>
        </ItemContentBlock>

        <ItemContentBlock>
          <ItemDescriptionBlock>
            <h1 className="block_discription_title text_left">Cloud Store <span> - вы всегда будете иметь доступ к вашим файлам будь вы дома, на работе или в движении</span></h1>
          </ItemDescriptionBlock>
          <ItemImgBlock imgPath="./img2.jpg" />
          {/* <ItemImgBlock imgPath={img2} /> */}
        </ItemContentBlock>

      </main>

      <div>
        <div className="navigation footer_navigation">
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
      </div>

      <footer>
        <span className="footer-descriptoin">
          Ноябрь 2024 г. © Ремезов Дмитрий 
        </span>
      </footer>
    </>
  )
}
