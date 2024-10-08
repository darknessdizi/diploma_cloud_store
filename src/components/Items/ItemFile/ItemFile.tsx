import { formatBytes, handleName } from "../ItemFieldDisk/utils"

export const ItemFile = ({ file }) => {
  return (
    <div className="conteiner__file__item" id={file.id}>
      <img src={handleName(file.title)} alt="" className="files__item__img" />
      <div className="file__item__info">
        <div className="item__info__title">Название: <span>{file.title}</span></div>
        {/* <span>{file.title}</span> */}
        <div className="item__info__title">Коментарий: <span>{file.comment}</span></div>
        <div className="item__info__title">Последняя загрузка: <span>{file.last_download}</span></div>
        <div className="item__info__title">Размер: <span>{formatBytes(file.size)}</span></div>
      </div>
    </div>
    
  )
}
