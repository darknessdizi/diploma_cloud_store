import { useNavigate } from 'react-router-dom';
import { MY_PATH, URL_SERVER } from '../../../const/index';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { deleteFile, deleteUser } from '../../../redux/slices/diskSlice';
import { setAuthTrue } from '../../../redux/slices/identificationSlice';
import { clearModal, runModal } from '../../../redux/slices/modalSlice';
import { baseFetch } from '../../../utils/index';
import { ItemCopyLink } from '../ItemCopyLink/ItemCopyLink';
import { ItemFormEdit } from '../ItemFormEdit/ItemFormEdit';
import './itemModal.css';

export const ItemModal = () => {
  const { modalType, message } = useAppSelector((state) => state.modal); // получение данных из глобального хранилища
  const { currentFile, link, currentUser } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера
  const navigate = useNavigate();

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    // Обработчик нажатия кнопки в модальном окне
    const target = event.target as HTMLDivElement;
    const { name } = target.dataset;
    dispatch(clearModal())

    if (name === "registration") {
      dispatch(setAuthTrue());
      navigate(MY_PATH.disk, { replace: true }) // перевод на другую страницу без её перезапуска
      return;
    }

    if (name === 'deleteFile') {
      // нажатие кнопки удалить файл
      try {
        await baseFetch({ url: `${URL_SERVER}/api/file/${currentFile?.id}/`, method: "DELETE" });
        dispatch(deleteFile());
      } catch (e: any) {
        dispatch(runModal({ type: 'error', message: e.message }));
      }
      return;
    }

    if (name === 'deleteUser') {
      // нажатие кнопки удалить пользователя
      try {
        await baseFetch({ url: `${URL_SERVER}/admin/delete-user/${currentUser?.id}/`, method: "DELETE" });
        dispatch(deleteUser());
      } catch (e: any) {
        dispatch(runModal({ type: 'error', message: e.message }));
      }
      return;
    }
  }
  
  return (
    <div className="modal__page">
      <div className="modal__page__content">
        <div className="content__info">

          { (modalType === 'error')
            ? 
              <>
                <h1 className="content__title">Ошибка!</h1>
                <p className="content__message">{message}</p>
              </> 
            : 
              <h1 className="content__title">{message}</h1>
          }
          
        </div>

        { (modalType === 'editFile') ? <ItemFormEdit /> : "" }
        { (modalType === 'copyLink') ? <ItemCopyLink urlLink={link} /> : "" }

        { ((modalType === 'deleteFile') || (modalType === 'deleteUser')) ?
          <div className="content__controll"> 
            <div className="content__btn" onClick={handleClick} data-name={modalType}>Да</div>
            <div className="content__btn" onClick={handleClick} data-name="return">Нет</div>
          </div> : ""
        }

        { (modalType === 'registration') ? <div className="content__btn" onClick={handleClick} data-name={modalType}>Ок</div> : "" }
        { (modalType === 'error') ? <div className="content__btn" onClick={handleClick} data-name={modalType}>Ок</div> : "" }

      </div>
    </div>
  )
}
