import { useAppSelector } from '../../../hooks/index';

export const DiskPage = () => {
  const { auth } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища

  return (
    <>
      { auth ? <div>DiskPage</div> : location.href="/login" }
    </>
  )
}
