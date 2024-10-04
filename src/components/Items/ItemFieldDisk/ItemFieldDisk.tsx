import './itemFieldDisk.css';

export const ItemFieldDisk = () => {
  return (
    <div className="conteiner__disk">
      <div className="disk__controll">
        <h3>Cloud Store</h3>
        <div className="disk__controll__statistika">
          <ul className="statistika__total">Всего файлов:
            <li className="statistika__item">Видео</li>
            <li className="statistika__item">Аудио</li>
            <li className="statistika__item">Документы</li>
            <li className="statistika__item">Изображения</li>
            <li className="statistika__item">Прочее</li>
          </ul>
        </div>
      </div>
      <div className="disk__field__files">
        <h1>Добро пожаловать в Cloud Store</h1>
      </div>
    </div>
  )
}
