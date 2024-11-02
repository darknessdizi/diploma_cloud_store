import './itemForm.css';

export const ItemForm = ({ children, submit }: {children: React.ReactNode, submit: (event: React.ChangeEvent<HTMLFormElement>) => void}) => {
  return (
    <>
      <form className="form__body" onSubmit={submit}>
        { children }
        <button type="submit" className="form__btn">Войти</button>
      </form>
    </>
  )
}
