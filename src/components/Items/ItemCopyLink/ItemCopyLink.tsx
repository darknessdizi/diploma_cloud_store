import { useRef } from "react";
import { useAppDispatch } from "../../../hooks/index";
import { deleteLink } from "../../../redux/slices/diskSlice";
import { clearModal } from "../../../redux/slices/modalSlice";
import "./itemCopyLink.css";


export const ItemCopyLink = ({ urlLink }: { urlLink: string }) => {
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера
  const inputRef = useRef<HTMLInputElement>(null); // ссылка на поле input
  
  const handleClick = () => {
    // Нажатие кнопки ок
    dispatch(clearModal());
    dispatch(deleteLink());
  }

  const selectedText = () => {
    // Нажатие на поле с текстом ссылки
    inputRef.current?.select();
  }

  const clickCopyText = () => {
    // Нажатие кнопки скопировать ссылку
    const link = inputRef.current?.value;
    if (link) {
      navigator.clipboard.writeText(link);
    }
  }

  return (
    <>
      <div className="content__copy__text">
        <input type="text" className="copy__text__link" readOnly value={urlLink} ref={inputRef} onClick={selectedText} />
        <div className="controll__item controll__item__copyText" onClick={clickCopyText}></div>
      </div>
      <div className="content__controll">
        <div className="content__btn" onClick={handleClick}>Ок</div>
      </div>
    </>
  )
}
