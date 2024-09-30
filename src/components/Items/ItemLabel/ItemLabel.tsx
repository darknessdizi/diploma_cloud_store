import './ItemLabel.css';

export const ItemLabel = ({ title, type, name, changeInput, value, message='Error' }) => {
  return (
    <label className="form__label">
      <span className="input__label__title">{title}</span>
      <input type={type} className="form__input" name={name} value={value} required onChange={changeInput} />
      <span className="input__message__error message__active">{message}</span>
    </label>
  )
}
