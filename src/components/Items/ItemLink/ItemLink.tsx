import { NavLink } from "react-router-dom";
import { ILinkProps } from "../../../models";
import "./itemLink.css";

export const ItemLink = (props: ILinkProps) => {
  const { link, label, logout } = props;
  const active = ({ isActive }: { isActive: boolean }) => isActive ? "item_link-active" : "";
  
  return (
    // заменяем тег а (ссылка), чтобы при клике не было перезапуска страницы
    <li className="item_link">
      <NavLink to={link} className={active} onClick={logout}>{label}</NavLink>
    </li>
  )
}
