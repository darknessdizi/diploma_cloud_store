import { URL_SERVER } from "../../../const/index";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import { changeFlag, changeUsers, selectedUser } from "../../../redux/slices/diskSlice";
import { runModal } from "../../../redux/slices/modalSlice";
import { baseFetch, getDate } from "../../../utils/index";
import { formatBytes } from "../ItemFieldUserDisk/utils";

export const ItemUser = ({ user }) => {
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера
  const lastVisit = getDate(user.lastVisit);
  const created = getDate(user.created);
  const statusChecked = user.statusAdmin ? "checked" : "";
  const setClasses = user.statusAdmin ? "table__body__row row__admin" : "table__body__row";
  const curentUsers = useAppSelector((state) => state.identification.user); // получение данных из глобального хранилища 
  const { cloudFiles } = useAppSelector((state) => state.disk); // получение данных из глобального хранилища

  let statusDisable = false;
  if (curentUsers.id === user.id) {
    statusDisable = true
  }

  const result = cloudFiles.reduce((counter, item) => {
    if (item.user_id === user.id) {
      counter.count += 1;
      counter.size += Number(item.size);
      return counter;
    }
    return counter;
  }, {count: 0, size: 0});

  const bytes = formatBytes(result.size);


  const changeRadio = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменения кнопки-флажок
    const value = event.target.checked;
    try {
      const obj = {
        id: user.id,
        status: value,
      }
      const response = await baseFetch({ url: `${URL_SERVER}/admin/change-status/`, method: "PATCH", body: JSON.stringify(obj) });
      if (response.status) {
        dispatch(changeUsers(obj));
      }
    } catch (e: any) {
      dispatch(runModal({ type: 'error', message: e.message }));
    }
  }

  const clickDelete = () => {
    // Нажатие кнопки удаления пользователя
    dispatch(selectedUser(user));
    const message = `Пользователь "${user.login}" будет удален безвозратно. Удалить пользователя?`
    dispatch(runModal({ type: 'deleteUser', message }));
  }

  const clickLook = () => {
    // Нажатие кнопки просмотр пользователя
    dispatch(selectedUser(user));
    dispatch(changeFlag())
    console.log('заходим на пользователя')
  }

  return (
    <>
      <tr className={setClasses}>
        <td className="table__body__item">{user.id}</td>
        <td className="table__body__item">{user.login}</td>
        <td className="table__body__item">{user.fullName}</td>
        <td className="table__body__item">{user.email}</td>
        <td className="table__body__item">
          <input className="input__checkbox" type="checkbox" name="admin" onChange={changeRadio} checked={statusChecked} disabled={statusDisable} />
        </td>
        <td className="table__body__item">{created}</td>
        <td className="table__body__item">{lastVisit}</td>
        <td className="table__body__item item__actions">
          {
            statusDisable ? "" : <div className="controll__item controll__item__delete" onClick={clickDelete}></div>
          }
        </td>
      </tr>
      <tr className="table__body__row__info">
        <td colSpan="2"></td>
        <td align="left" colSpan="2">Всего файлов: {result.count}</td>
        <td align="left" colSpan="3">Общий размер хранилища: {bytes} </td>
        <td className="table__body__item item__actions">
          <div className="controll__item controll__item__eye" onClick={clickLook}></div>
        </td>
      </tr>
    </>
  )
}
