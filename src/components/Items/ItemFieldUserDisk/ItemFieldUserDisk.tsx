import { useEffect } from 'react';
import { URL_SERVER } from '../../../const/index';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { addFiles, cancelUser, getAllFiles } from '../../../redux/slices/diskSlice';
import { baseFetch } from '../../../utils/index';
import { ItemFile } from '../ItemFile/ItemFile';
import { runModal } from '../../../redux/slices/modalSlice';

export const ItemFieldUserDisk = () => {
  const { currentUser, cloudFiles } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища
  const { user } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Нажатие кнопки добавить файлы в хранилище
    const files = event.target.files;
    if (files === null) return;
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file);
      formData.append('size', String(file.size));
      formData.append('user_id', user.id);

      let flagExit = true;
      let number = 2;
      let fileName = file.name;
      while (flagExit) {
        // Проверка дублирования имен файлов
        if (cloudFiles.map((el) => el.title).includes(fileName)) {
          if (/ \(\d+\)(\.[^.]+)$/.test(fileName)) {
            fileName = fileName.replace(/ \(\d+\)(\.[^.]+)$/i, ` (${number})$1`)
          } else {
            fileName = fileName.replace(/^([^.]+)$|(\.[^.]+)$/i, `$1 (${number})$2`)
          }
          number += 1;
        } else {
          flagExit = false;
        }
      }
      formData.append('title', fileName);
    }

    try {
      const response = await baseFetch({ url: `${URL_SERVER}/file/`, method: "POST", body: formData, });
      dispatch(addFiles(response.files));
      event.target.value = '';
    } catch (e: any) {
      dispatch(runModal({ type: 'error', message: e.message }));
    }
  }

  const handleClick = () => {
    // нажатие кнопки "назад"
    dispatch(cancelUser());
  }

  useEffect(() => { // срабатывает после первой отрисовки компонента и при изменении user (диск ушел за файлами)
    if (user.id) {
      const targetId = (currentUser) ? currentUser.id: user.id;
      baseFetch({ url: `${URL_SERVER}/get-files/${targetId}/` }).then(
        (res) => dispatch(getAllFiles(res)),
        (err) => dispatch(runModal({ type: 'error', message: err.message }))
      )
    }
  }, [user]);

  return (
    <>
      <div className="content__disk__files">
        
        { 
          currentUser 
          ? 
            <>
              <h1>Файлы пользователя "{currentUser.login}"</h1>
              <div className="content__disk__controll">
                { (currentUser.id === user.id) 
                  ? 
                  <>
                    <form id={user.id} className="files__form" style={{marginRight: 50 + 'px'}}>
                      <label className="form__add__btn">
                        <input type="file" className="form__add__input" multiple name="file" onChange={handleChange} />
                        Добавить файлы
                      </label>
                    </form>
                  </>
                  : "" }
                <button type="button" className="disk__btn__back" onClick={handleClick}>Назад</button>
              </div>
            </> 
          : 
            <>
              <h1>Добро пожаловать в Cloud Store</h1>
              <div className="content__disk__controll">
                <form id={user.id} className="files__form" >
                  <label className="form__add__btn">
                    <input type="file" className="form__add__input" multiple name="file" onChange={handleChange} />
                    Добавить файлы
                  </label>
                </form>
              </div>
            </>
        }

        <div className="files__field">
          { cloudFiles.map((file, index) => <ItemFile file={file} key={index}/>) }
        </div>    

      </div>
    </>
  )
}
