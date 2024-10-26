import { useEffect } from 'react';
import { URL_SERVER } from '../../../const/index';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { addFiles, getAllFiles } from '../../../redux/slices/diskSlice';
import { baseFetch } from '../../../utils/index';
import { countSizeFiles, formatBytes } from './utils';
import { ItemFile } from '../ItemFile/ItemFile';
import './itemFieldDisk.css';
import { runModal } from '../../../redux/slices/modalSlice';

export const ItemFieldUserDisk = ({ user }) => {
  const { cloudFiles } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  console.log('render DiskPage, сейчас files:', cloudFiles)
  const size = countSizeFiles(cloudFiles);
  const bytes = formatBytes(size);

  const handleChange = async (event) => {
    const formData = new FormData();
    for (const file of event.target.files) {
      formData.append('file', file);
      // Проверка дублирования имен файлов
      if (cloudFiles.map((el) => el.title).includes(file.name)) {
        formData.append('title', file.name.replace(/^([^.]+)$|(\.[^.]+)$/i, '$1_copy_$2'))
      } else {
        formData.append('title', file.name);
      }
      formData.append('size', file.size);
      formData.append('user_id', user.id);
    }

    try {
      const response = await baseFetch({ url: `${URL_SERVER}/file/`, method: "POST", body: formData, });
      dispatch(addFiles(response.files));
      event.target.value = '';
    } catch (e: any) {
      dispatch(runModal({ type: 'error', message: e.message }));
    }
  }

  useEffect(() => { // срабатывает после первой отрисовки компонента и при изменении user
    if (user.id) {
      console.log('диск ушел за файлами', user)
      baseFetch({ url: `${URL_SERVER}/get-files/` }).then(
        (res) => dispatch(getAllFiles(res)),
        (err) => dispatch(runModal({ type: 'error', message: err.message }))
      )
    }
  }, [user]);

  return (
    <>
      <div className="content__disk__info">
        <div className="disk__info__user">
          <h3>{user.fullName}</h3>
          <img src={user.avatar} alt="" className="info__user__avatar" />
          <div className="info__user__email">Email: <span>{user.email}</span></div>
        </div>
        <span>Статус: пользователь</span>
        <div className="info__statistika">
          <div className="info__size">
            <span>Всего файлов: {cloudFiles.length}</span>
            <span>Общий объём: {bytes}</span>
          </div>
            {/* <ul className="statistika__total">Из них:
              <li className="statistika__item">Видео</li>
              <li className="statistika__item">Аудио</li>
              <li className="statistika__item">Документы</li>
              <li className="statistika__item">Изображения</li>
              <li className="statistika__item">Прочее</li>
            </ul> */}
        </div>
      </div>

      <div className="content__disk__files">
          
        <h1>Добро пожаловать в Cloud Store</h1>
        <form id={user.id} className="files__form" >
          <label className="form__add__btn">
            <input type="file" className="form__add__input" multiple name="file" onChange={handleChange} />
            Добавить файлы
          </label>
        </form>        

        <div className="files__field">
          { cloudFiles.map((file, index) => <ItemFile file={file} key={index} />) }
        </div>

      </div>
    </>
  )
}
