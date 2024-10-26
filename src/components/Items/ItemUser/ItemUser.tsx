import { URL_SERVER } from "../../../const/index";
import { useAppDispatch } from "../../../hooks/index";
import { changeUsers } from "../../../redux/slices/diskSlice";
import { runModal } from "../../../redux/slices/modalSlice";
import { baseFetch, getDate } from "../../../utils/index";

export const ItemUser = ({ user }) => {
  const dispatch = useAppDispatch(); // dispatch это словно диспетчер - он доставляет action для нашего редьюсера
  const lastVisit = getDate(user.lastVisit);
  const created = getDate(user.created);
  const statusAdmin = user.statusAdmin ? "checked" : "";
  const classAdmin = user.statusAdmin ? "table__body__row row__admin" : "table__body__row";

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

  return (
    <tr className={classAdmin}>
      <td className="table__body__item">{user.id}</td>
      <td className="table__body__item">{user.fullName}</td>
      <td className="table__body__item">{user.email}</td>
      <td className="table__body__item">{user.avatar}</td>
      <td className="table__body__item">
        <input className="input__checkbox" type="checkbox" name="admin" onChange={changeRadio} checked={statusAdmin}></input>
      </td>
      <td className="table__body__item">{created}</td>
      <td className="table__body__item">{lastVisit}</td>
    </tr>
  )
}
