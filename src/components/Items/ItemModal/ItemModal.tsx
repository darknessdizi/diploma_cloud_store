import { Link } from 'react-router-dom';
import { URL_SERVER } from '../../../const/index';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { deleteFile } from '../../../redux/slices/diskSlice';
import { setAuthTrue } from '../../../redux/slices/identificationSlice';
import { clearModal, runModal } from '../../../redux/slices/modalSlice';
import { baseFetch } from '../../../utils/index';
import { ItemCopyLink } from '../ItemCopyLink/ItemCopyLink';
import { ItemFormEdit } from '../ItemFormEdit/ItemFormEdit';
import './itemModal.css';

export const ItemModal = () => {
  const { modalType, message } = useAppSelector((state) => state.modal); // получение данных из глобального хранилища
  const { currentFile, link } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleClick = async (event) => {
    // Обработчик нажатия кнопки в модальном окне
    const { name } = event.target;
    dispatch(clearModal())

    if (event.target.pathname === "/disk") {
      dispatch(setAuthTrue());
    }

    if (name === 'delete') {
      // нажатие кнопки удалить файл
      try {
        await baseFetch({ url: `${URL_SERVER}/file/${currentFile.id}/`, method: "DELETE" });
        dispatch(deleteFile());
      } catch (e: any) {
        dispatch(runModal({ type: 'error', message: e.message }));
      }
    }
  }

  const url = (modalType === 'error') ? "#"
    : (modalType === 'registration') ? "/disk"
    : "#";
  
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
            : <h1 className="content__title">{message}</h1>
          }
          
        </div>

        { (modalType === 'deleteFile')
          ? 
            <div className="content__controll">
              <Link to={url} className="content__link" onClick={handleClick} name="delete">Да</Link>
              <Link to={url} className="content__link" onClick={handleClick} name="return">Нет</Link>
            </div>
          : 
            (modalType === 'editFile')
          ? 
            <ItemFormEdit />
          : 
            (modalType === 'copyLink')
          ? 
            <ItemCopyLink urlLink={link} />
          : 
            <Link to={url} className="content__link" onClick={handleClick}  name="return">Ок</Link>
        }

      </div>
    </div>
  )
}
