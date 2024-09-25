import { URL_SERVER } from "../../const/index";

export const PopupLogin = () => {
  const url = `${URL_SERVER}/login`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { target } = event;
    console.log(target);
    const req = await fetch(url);
    const resp = await req.json();
    console.log('ответ', resp);
  }

  return (
    <div className="conteiner_popup_login">
      <form className="popup__login" onSubmit={handleSubmit}>
        <label className="popup__login__label">
          <span className="popup__label__title">Login</span>
          <input type="text" className="popup__login__input" name="login" required />
        </label>
        <label className="popup__login__label">
          <span className="popup__label__title">Password</span>
          <input type="text" className="popup__login__input" name="password" required />
        </label>
        <button type="submit" className="popup__form__btn">Войти</button>
      </form>
    </div>
  )
}
