import { useAppSelector, useAppDispatch } from '../../../hooks/index';
import { clearError } from '../../../redux/slices/identificationSlice';
import './modalPage.css';

export const ModalPage = ({ message }) => {
  const { error } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleClick = () => {
    dispatch(clearError());
  }
  
  return (
    <div className="modal__page">
      <div className="modal__page__content">
        <div className="content__info">
          <h1 className="content__title">Ошибка!</h1>
          <p className="content__message">{message}</p>
        </div>
        <button type="button" className="content__btn" onClick={handleClick}>Ок</button>
      </div>
    </div>
  )
}
