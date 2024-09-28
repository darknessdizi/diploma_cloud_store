import { NavLink } from "react-router-dom";
import "./itemLink.css"

export const ItemLink = ({link, label}) => {
  const active = ({ isActive }: { isActive: boolean }) => isActive ? "item_link-active" : "";
  
  return (
    // заменяем тег а (ссылка), чтобы при клике не было перезапуска страницы
    <li className="item_link">
      <NavLink to={link} className={active}>{label}</NavLink>
    </li>
  )
}
