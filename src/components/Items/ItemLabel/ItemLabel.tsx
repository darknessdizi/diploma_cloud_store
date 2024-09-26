import './ItemLabel.css';

export const ItemLabel = ({ title, type }) => {
  return (
    <label className="form__label">
      <span className="input__label__title">{title}</span>
      <input type={type} className="form__input" name="login" required />
    </label>
  )
}
