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

  const handleClick = (event) => {
    dispatch(cancelUser());
  }

  useEffect(() => { // срабатывает после первой отрисовки компонента и при изменении user
    if ((user.id) && (!currentUser)) {
      console.log('диск ушел за файлами', user)
      baseFetch({ url: `${URL_SERVER}/get-files/${user.id}/` }).then(
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
          { cloudFiles.map((file, index) => {
              if (currentUser) {
                if (file.user_id === currentUser.id) {
                  return <ItemFile file={file} key={index} />;
                }
              } else {
                return <ItemFile file={file} key={index} />;
              }
            }) 
          }
        </div>    

      </div>
    </>
  )
}
