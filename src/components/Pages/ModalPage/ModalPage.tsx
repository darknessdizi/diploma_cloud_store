import { useAppSelector, useAppDispatch } from '../../../hooks/index';
import { clearError, clearModal } from '../../../redux/slices/identificationSlice';
import { Link } from "react-router-dom";
import './modalPage.css';

export const ModalPage = ({ message }) => {
  const { error } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleClick = () => {
    error.status ? dispatch(clearError()) : dispatch(clearModal());
  }

  const url = error.status ? "#" : "/disk";
  
  return (
    <div className="modal__page">
      <div className="modal__page__content">
        <div className="content__info">

          { error.status ? 
          <>
            <h1 className="content__title">Ошибка!</h1>
            <p className="content__message">{message}</p>
          </> :
            <h1 className="content__title">Вы успешно зарегистрированы!</h1>
          }

        </div>
        <Link to={url} className="content__link" onClick={handleClick}>Ок</Link>
      </div>
    </div>
  )
}
