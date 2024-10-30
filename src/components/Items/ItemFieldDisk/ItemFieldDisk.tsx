import { useAppSelector } from '../../../hooks/index';
import { ItemFieldAdminDisk } from '../ItemFieldAdminDisk/ItemFieldAdminDisk';
import { ItemFieldUserDisk } from '../ItemFieldUserDisk/ItemFieldUserDisk';
import { countSizeFiles, formatBytes } from '../ItemFieldUserDisk/utils';
import './itemFieldDisk.css';

export const ItemFieldDisk = () => {
  const { cloudFiles, flagLookUser } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища
  const { user } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  console.log('отрисовка диска', cloudFiles)

  const size = countSizeFiles(cloudFiles);
  const bytes = formatBytes(size);
  const status = (user.statusAdmin) ? 'администратор': 'пользователь';

  return (
    <>
      <div className="conteiner__disk">
        <div className="content__disk__info">
          <div className="disk__info__user">
            <h3>{user.fullName}</h3>
            <img src={user.avatar} alt="" className="info__user__avatar" />
            <div className="info__user__email">Email: <span>{user.email}</span></div>
          </div>
          <span>Статус: {status}</span>
          <div className="info__statistika">
            <div className="info__size">
              <span>Всего файлов: {cloudFiles.length}</span>
              <span>Общий объём: {bytes}</span>
            </div>
          </div>
        </div>
        { user.statusAdmin ? 
          (flagLookUser) ? <ItemFieldUserDisk /> : <ItemFieldAdminDisk user={user} />
          : <ItemFieldUserDisk /> }
      </div>
    </>
  )
}
