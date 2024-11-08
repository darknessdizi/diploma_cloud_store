import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux"; // достаем провайдер для работы с глобальным хранилищем
import { store } from "./redux/store/"; // наше хранилище
// import { HashRouter } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <HashRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </HashRouter>
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)