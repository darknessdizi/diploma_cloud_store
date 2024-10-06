import './itemFieldDisk.css';
import { useEffect, useRef } from 'react';
import { URL_SERVER } from '../../../const/index';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { getAllFiles } from '../../../redux/slices/diskSlice';

async function getFiles(id) {
  const response = await fetch(`${URL_SERVER}/file/${id}`);
  return await response.json();
}

export const ItemFieldDisk = ({ user }) => {
  const inputRef = useRef(null); // ссылка на поле input
  const { files } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleChange = async (event) => {
    const formData = new FormData();
    for (const file of event.target.files) {
      formData.append('file', file);
      // Проверка дублирования имен файлов
      console.log('global', files, file.name)
      if (files.map((el) => el.title).includes(file.name)) {
        formData.append('title', file.name.replace(/^([^.]+)$|(\.[^.]+)$/i, '$1_copy_$2'))
      } else {
        formData.append('title', file.name);
      }
      formData.append('size', file.size);
      formData.append('user_id', user.id);
    }
    const response = await fetch(`${URL_SERVER}/file/`, {
      method: "POST",
      body: formData,
    });
    console.log(await response.json());
    event.target.value = '';
  }

  useEffect(() => { // срабатывает после первой отрисовки компонента
    getFiles(user.id).then((res) => {
      console.log('response files', res);
      dispatch(getAllFiles(res));
    })
  }, []);

  return (
    <div className="conteiner__disk">
      <div className="disk__controll">
        <h3>{user.full_name}</h3>
        <img src={user.avatar} alt="" className="controll__avatar" />
        <div className="disk__controll__statistika">
          <ul className="statistika__total">Всего файлов:
            <li className="statistika__item">Видео</li>
            <li className="statistika__item">Аудио</li>
            <li className="statistika__item">Документы</li>
            <li className="statistika__item">Изображения</li>
            <li className="statistika__item">Прочее</li>
          </ul>
        </div>
      </div>
      <div className="disk__field__files">
        <h1>Добро пожаловать в Cloud Store</h1>
        <form id={user.id} ref={inputRef} >
          <input type="file" multiple name="file" onChange={handleChange} />
        </form>
      </div>
    </div>
  )
}
