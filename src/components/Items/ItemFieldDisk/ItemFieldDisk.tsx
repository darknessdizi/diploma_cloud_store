import './itemFieldDisk.css';
import { useEffect, useRef } from 'react';
import { URL_SERVER } from '../../../const/index';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { addFiles, getAllFiles } from '../../../redux/slices/diskSlice';
import { baseFetch } from '../../../utils/index';
import { countSizeFiles, formatBytes } from './utils';
import { ItemFile } from '../ItemFile/ItemFile';

export const ItemFieldDisk = ({ user }) => {
  const inputRef = useRef(null); // ссылка на поле input
  const { cloudFiles } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  console.log('files:', cloudFiles)
  // console.log('user:', user, countSizeFiles(cloudFiles))
  const size = countSizeFiles(cloudFiles);
  const bytes = formatBytes(size);
  console.log('size:', size, bytes )

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

    const response = await baseFetch({ url: `${URL_SERVER}/file/`, method: "POST", body: formData, });
    dispatch(addFiles(response.files));
    event.target.value = '';
  }

  useEffect(() => { // срабатывает после первой отрисовки компонента
    baseFetch({ url: `${URL_SERVER}/file/${user.id}` }).then((res) => {
      dispatch(getAllFiles(res));
    })
  }, []);

  return (
    <div className="conteiner__disk">

      <div className="content__disk__info">
        <h3>{user.full_name}</h3>
        <img src={user.avatar} alt="" className="info__user__avatar" />
        <div className="info__statistika">
          <div className="info__size">
            <span>Всего файлов: {cloudFiles.length}</span>
            <span>Общий объём: {bytes}</span>
          </div>
          <ul className="statistika__total">Из них:
            <li className="statistika__item">Видео</li>
            <li className="statistika__item">Аудио</li>
            <li className="statistika__item">Документы</li>
            <li className="statistika__item">Изображения</li>
            <li className="statistika__item">Прочее</li>
          </ul>
        </div>
      </div>

      <div className="content__disk__files">
        
        <h1>Добро пожаловать в Cloud Store</h1>
        {/* <div className="content__disk__form"> */}
          <form id={user.id} ref={inputRef} className="files__form" >
            <label className="form__add__btn">
              <input type="file" className="form__add__input" multiple name="file" onChange={handleChange} />
              Добавить файлы
            </label>
          </form>
        {/* </div> */}
        

        <div className="files__field">
          { cloudFiles.map((file, index) => {
            return <ItemFile file={file} key={index} />
          }) }
        </div>
        

      </div>
    </div>
  )
}
