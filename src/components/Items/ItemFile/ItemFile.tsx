import { URL_SERVER } from "../../../const/index";
import { useAppDispatch } from "../../../hooks/index";
import { selectedFile } from "../../../redux/slices/diskSlice";
import { runModal } from "../../../redux/slices/modalSlice";
import { baseFetch } from "../../../utils/index";
import { formatBytes, handleName } from "../ItemFieldDisk/utils"

export const ItemFile = ({ file }) => {
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const clickDelete = () => {
    // Нажатие кнопки удаления файла
    dispatch(selectedFile(file));
    const message = `Файл "${file.title}" будет удален безвозратно. Удалить файл?`
    dispatch(runModal({ type: 'deleteFile', message }));
  }

  const clickDownload = async (event) => {
    // Нажатие кнопки скачать файл с сервера
    const { id } = event.target.dataset;
    event.target.classList.add('active__download');
    const blob = await baseFetch({ url: `${URL_SERVER}/file/${id}/`, blob: true });
    const objectURL = URL.createObjectURL(blob);
    const linkFile = document.createElement('a');
    linkFile.href = objectURL;
    linkFile.setAttribute('download', file.title);
    linkFile.click();
    window.URL.revokeObjectURL(objectURL);
    event.target.classList.remove('active__download');
  }

  return (
    <div className="conteiner__file__item">
      <div className="file__item__controll">
        <div className="controll__item controll__item__edit"></div>
        <div className="controll__item controll__item__download" data-id={file.id} onClick={clickDownload}></div>
        {/* <div className="item__controll__item controll__item__link"></div> */}
        <div className="controll__item controll__item__delete" onClick={clickDelete}></div>
      </div>
      <img src={handleName(file.title)} alt="" className="files__item__img" />
      <div className="file__item__info">
        <div className="item__info__title">Название: <span>{file.title}</span></div>
        <div className="item__info__title">Коментарий: <span>{file.comment}</span></div>
        <div className="item__info__title">Последняя загрузка: <span>{file.last_download}</span></div>
        <div className="item__info__title">Размер: <span>{formatBytes(file.size)}</span></div>
      </div>
    </div>
  )
}
