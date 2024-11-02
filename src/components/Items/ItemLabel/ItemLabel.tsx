import { IItemLabel } from '../../../models';
import './ItemLabel.css';

export const ItemLabel = ({ title, type, name, changeInput, value, message, error=false }: IItemLabel) => {
  return (
    <label className="form__label">
      <span className="input__label__title">{title}</span>
      <input type={type} className="form__input" name={name} value={value} onChange={changeInput} />
      <div className="input__message__error">
        { error ? <span className="message__active">{message}</span> : "" }
      </div>
    </label>
  )
}
