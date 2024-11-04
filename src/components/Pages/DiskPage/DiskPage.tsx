import { useAppSelector } from '../../../hooks/index';
import { ItemFieldDisk } from '../../Items/ItemFieldDisk/ItemFieldDisk';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { MY_PATH } from '../../../const';

export const DiskPage = () => {
  const { auth } = useAppSelector((state) => state.identification); // получение данных из глобального хранилища
  const navigate = useNavigate();

  useEffect(() => { // срабатывает после первой отрисовки компонента
    if (!auth) {
      navigate(MY_PATH.login, { replace: true }); // перевод на другую страницу без перезапуска страницы
    }
  }, [auth]);

  return (
    <>
      { auth ? <ItemFieldDisk /> : '' }
    </>
  )
}
