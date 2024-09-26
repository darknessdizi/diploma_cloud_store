import { NavLink } from "react-router-dom";
import "./itemLink.css"

export const ItemLink = ({link, label}) => {
  return (
    // заменяем тег а (ссылка), чтобы при клике не было перезапуска страницы
    <li className="item_link">
      <NavLink to={link}>{label}</NavLink>
    </li>
  )
}
