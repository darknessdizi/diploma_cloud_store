import { URL_SERVER } from "../../../const/index";
import { useAppDispatch } from "../../../hooks/index";
import { selectedFile, updateFile } from "../../../redux/slices/diskSlice";
import { runModal } from "../../../redux/slices/modalSlice";
import { baseFetch } from "../../../utils/index";
import { formatBytes, handleName } from "../ItemFieldDisk/utils";

function _addZero(number: number) {
  // делает число двухзначным
  let result: string | number = number;
  if (result < 10) {
    result = `0${result}`;
  }
  return result;
}

export const ItemFile = ({ file }) => {
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  let dateString = '-';
  if (file.last_download) {
    const date = new Date(file.last_download);
    const year = date.getFullYear();
    const month = _addZero(date.getMonth() + 1);
    const day = _addZero(date.getDate());
    const hours = _addZero(date.getHours());
    const minutes = _addZero(date.getMinutes());
    dateString = `${hours}:${minutes} ${day}.${month}.${year}`;
  }

  const clickDelete = () => {
    // Нажатие кнопки удаления файла
    dispatch(selectedFile(file));
    const message = `Файл "${file.title}" будет удален безвозратно. Удалить файл?`
    dispatch(runModal({ type: 'deleteFile', message }));
  }

  const clickDownload = async (event: React.ChangeEvent<HTMLDivElement>) => {
    // Нажатие кнопки скачать файл с сервера
    try {
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
      const response = await baseFetch({ url: `${URL_SERVER}/filedata/${id}/` }); // обновляем данные по текущему файлу (изменилось поле последняя загрузка)
      dispatch(updateFile(response));
    } catch (e: any) {
      dispatch(runModal({ type: 'error', message: e.message }));
    }
  }

  const clickEdit = () => {
    // Нажатие кнопки редактирование файла
    dispatch(selectedFile(file));
    dispatch(runModal({ type: 'editFile', message: 'Редактирование файла' }));
  }

  return (
    <div className="conteiner__file__item">
      <div className="file__item__controll">
        <div className="controll__item controll__item__copylink" onClick={clickEdit}></div>
        <div className="controll__item controll__item__edit" onClick={clickEdit}></div>
        <div className="controll__item controll__item__download" data-id={file.id} onClick={clickDownload}></div>
        {/* <div className="item__controll__item controll__item__link"></div> */}
        <div className="controll__item controll__item__delete" onClick={clickDelete}></div>
      </div>
      <img src={handleName(file.title)} alt="" className="files__item__img" />
      <div className="file__item__info">
        <div className="item__info__title">Название: <span>{file.title}</span></div>
        <div className="item__info__title">Комментарий: <span>{file.comment}</span></div>
        <div className="item__info__title">Последняя загрузка: <span className="title__date">{dateString}</span></div>
        <div className="item__info__title">Размер: <span>{formatBytes(file.size)}</span></div>
      </div>
    </div>
  )
}
