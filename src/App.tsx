import { useState } from 'react';
import './App.css';
import { Clock } from './components/Clock/Clock';
import { Form } from './components/Form/Form';
import { IAppState } from './modal/modal';

function App() {
  const [formValue, setFormValue] = useState<IAppState>({
    title: '',
    zone: '',
    arrayClock: [],
  })

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    // Нажали кнопку добавить в нашей форме
    event.preventDefault();
    const obj = {
      title: formValue.title,
      zone: formValue.zone,
    };

    setFormValue({
      ...formValue,
      title: '',
      zone: '',
      arrayClock: [...formValue.arrayClock, obj],
    });
  }

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Обрабатываем изменение в поле input
    const {name, value} = event.target;

    if (name === 'zone') {
      setFormValue({
        ...formValue,
        [name]: value.trim(),
      });
    }

    if (name === 'title') {
      setFormValue({
        ...formValue,
        [name]: value,
      });
    }
  }

  const clickCross = (event: React.ChangeEvent<HTMLDivElement>) => {
    // Нажали кнопку удаления часов
    const parent = event.target.closest('.clock__item');
    if (parent) {
      const clockTitle = parent.querySelector('.clock__title');
      if (clockTitle) {
        const valueTitle = clockTitle.textContent;
        let array = [...formValue.arrayClock];
        array = array.filter((item) => item.title != valueTitle);
        setFormValue({
          ...formValue,
          arrayClock: [...array],
        });
      }
    }
  }

  return (
    <div className="conteiner">

      <div className="conteiner__form">
        <Form title={formValue.title} zone={formValue.zone} submit={handleSubmit} change={changeInput} ></Form>
      </div>
      

      <div className="conteiner__clock">
        <Clock list={formValue.arrayClock} callback={clickCross} />
      </div>

    </div>
  )
}

export default App
