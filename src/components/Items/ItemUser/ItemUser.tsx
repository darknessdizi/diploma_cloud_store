import { getDate } from "../../../utils/index";

export const ItemUser = ({ user }) => {
  const lastVisit = getDate(user.lastVisit);
  const created = getDate(user.created);
  const statusAdmin = user.statusAdmin ? "checked" : "";
  const classAdmin = user.statusAdmin ? "table__body__row row__admin" : "table__body__row";

  const changeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменения радиокнопки
    const value = event.target.checked;
    console.log(value);

    // if (value) {
    //   event.target.checked = false;
    // } else {
    //   event.target.checked = true;
    // }
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
