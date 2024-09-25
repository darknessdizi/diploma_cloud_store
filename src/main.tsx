import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from "react-redux"; // достаем провайдер для работы с глобальным хранилищем
import { store } from "./redux/store/"; // наше хранилище

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
