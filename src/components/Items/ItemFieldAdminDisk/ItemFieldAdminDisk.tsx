import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { addUsers, getAllFiles } from '../../../redux/slices/diskSlice';
import { baseFetch } from '../../../utils/index';
import { runModal } from '../../../redux/slices/modalSlice';
import { ItemUser } from '../ItemUser/ItemUser';
import { IUserState } from '../../../models';
import './ItemFieldAdminDisk.css';

export const ItemFieldAdminDisk = ({ user }: {user: IUserState}) => {
  const { cloudUsers } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера

  useEffect(() => { // срабатывает после первой отрисовки компонента и при изменении user (диск ушел за пользователями)
    if (user.id) {
      baseFetch({ url: `${import.meta.env.VITE_BACKEND_URL}/admin/get-users/` }).then(
        (res) => {
          dispatch(getAllFiles(res.files))
          dispatch(addUsers(res.users))
        },
        (err) => dispatch(runModal({ type: 'error', message: err.message }))
      )
    }
  }, [user]);

  return (
    <>
      <div className="content__disk__files">
          
        <h1>Панель администратора "{user.login}"</h1>

        <table className="disk__admin__table">
          <thead className="admin__table__header">
            <tr>
                <th className="table__header__item item__id">id</th>
                <th className="table__header__item item__login">Логин</th>
                <th className="table__header__item item__full-name">Полное имя</th>
                <th className="table__header__item item__email">E-mail</th>
                <th className="table__header__item item__status">Статус администратора</th>
                <th className="table__header__item item__created">Создан</th>
                <th className="table__header__item item__lost-visit">Последний<br/>вход</th>
                <th className="table__header__item item__actions">Действия</th>
            </tr>
          </thead>

          <tbody>
            { cloudUsers.map((item, index) => <ItemUser user={item} key={index} />) }
          </tbody>

        </table>

      </div>
    </>
  )
}

