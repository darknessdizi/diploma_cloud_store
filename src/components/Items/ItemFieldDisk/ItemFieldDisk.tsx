import { useAppSelector } from '../../../hooks/index';
import { ItemFieldAdminDisk } from '../ItemFieldAdminDisk/ItemFieldAdminDisk';
import { ItemFieldUserDisk } from '../ItemFieldUserDisk/ItemFieldUserDisk';

export const ItemFieldDisk = ({ user }) => {
  const { currentUser, cloudFiles } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища
  console.log('отрисовка диска', currentUser, cloudFiles)

  return (
    <>
      <div className="conteiner__disk">
        { user.statusAdmin ? 
          (currentUser) ? <ItemFieldUserDisk user={currentUser} /> : <ItemFieldAdminDisk user={user} />
          : <ItemFieldUserDisk user={user} /> }
      </div>
    </>
  )
}
