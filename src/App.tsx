// import { useState } from 'react';
import './App.css';
import { PopupLogin } from './components/PopupLogin/PopupLogin';

function App() {

  return (
    <div className="conteiner">

      <header>
        <div className="header_baner">
          <div className="navigation header_navigation">
            <button className="navigation_button login">Вход</button>
            <button className="navigation_button logout">Выход</button>
            <button className="navigation_button registration">Регистрация</button>
          </div>
        </div>
      </header>

      <main className="page_content">

        <div className="content_block">
          <div className="block_discription">
            <h1 className="block_discription_title">Cloud Store <span> - лучшее решение для работы с Вашими файлами</span></h1>
          </div>
          <div className="block_img">
            <img src="./15.jpg" alt="Изображение облачного хранилища" />
          </div>
        </div>

        <div className="content_block">
          <div className="block_discription">
            <h1 className="block_discription_title">Cloud Store <span> - лучшее решение для работы с Вашими файлами</span></h1>
          </div>
          <div className="block_img">
            <img src="./15.jpg" alt="Изображение облачного хранилища" />
          </div>
        </div>

        <div className="content_block">
          <div className="block_discription">
            <h1 className="block_discription_title">Cloud Store <span> - лучшее решение для работы с Вашими файлами</span></h1>
          </div>
          <div className="block_img">
            <img src="./15.jpg" alt="Изображение облачного хранилища" />
          </div>
        </div>

      </main>

      <footer>
        <div className="navigation footer_navigation">
          <button className="navigation_button login">Вход</button>
          <button className="navigation_button logout hidden">Выход</button>
          <button className="navigation_button registration">Регистрация</button>
        </div>
      </footer>

      {/* <PopupLogin></PopupLogin> */}
      
    </div>
  )
}

export default App
