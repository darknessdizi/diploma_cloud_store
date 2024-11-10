import { useAppDispatch } from "../../../hooks/index";
import { IFile } from "../../../models";
import { addLink, selectedFile, updateFile } from "../../../redux/slices/diskSlice";
import { runModal } from "../../../redux/slices/modalSlice";
import { baseFetch, getDate } from "../../../utils/index";
import { formatBytes, handleName } from "../ItemFieldUserDisk/utils";
import "./itemFile.css";

export const ItemFile = ({ file }: {file: IFile}) => {
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  let dateString = '-';
  if (file.lastDownload) {
    dateString = getDate(file.lastDownload);
  }

  const clickDownload = async (event: React.MouseEvent<HTMLDivElement>) => {
    // Нажатие кнопки скачать файл с сервера
    try {
      const target = event.target as HTMLDivElement;
      const { id } = target.dataset;
      target.classList.add('active__download');
      const blob = await baseFetch({ url: `${import.meta.env.VITE_BACKEND_URL}/api/file/${id}/`, blob: true });
      const objectURL = URL.createObjectURL(blob);
      const linkFile = document.createElement('a');
      linkFile.href = objectURL;
      linkFile.setAttribute('download', file.title);
      linkFile.click();
      window.URL.revokeObjectURL(objectURL);
      target.classList.remove('active__download');
      const response = await baseFetch({ url: `${import.meta.env.VITE_BACKEND_URL}/api/filedata/${id}/` }); // обновляем данные по текущему файлу (изменилось поле последняя загрузка)
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

  const clickDelete = () => {
    // Нажатие кнопки удаления файла
    dispatch(selectedFile(file));
    const message = `Файл "${file.title}" будет удален безвозратно. Удалить файл?`
    dispatch(runModal({ type: 'deleteFile', message }));
  }

  const clickCopyLink = async () => {
    // Нажатие кнопки копирования ссылки на файл
    try {
      const response = await baseFetch({ url: `${import.meta.env.VITE_BACKEND_URL}/api/getlink/${file.id}/` });
      dispatch(addLink(response.url));
      dispatch(runModal({ type: 'copyLink', message: 'Ссылка для скачивания' }));
    } catch (e: any) {
      dispatch(runModal({ type: 'error', message: e.message }));
    }
  }

  return (
    <div className="conteiner__file">
      <div className="file__controll">
        <div className="controll__item controll__item__copylink" onClick={clickCopyLink}></div>
        <div className="controll__item controll__item__edit" onClick={clickEdit}></div>
        <div className="controll__item controll__item__download" data-id={file.id} onClick={clickDownload}></div>
        <div className="controll__item controll__item__delete" onClick={clickDelete}></div>
      </div>
      <img src={handleName(file.title)} alt="" className="file__img" />
      <div className="file__info">
        <div className="info__item">Название: <span>{file.title}</span></div>
        <div className="info__item item__comment">Комментарий: <span>{file.comment}</span></div>
        <div className="info__item">Последняя загрузка: <span className="title__date">{dateString}</span></div>
        <div className="info__item">Размер: <span>{formatBytes(file.size)}</span></div>
      </div>
    </div>
  )
}
