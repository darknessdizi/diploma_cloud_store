import { useDispatch, useSelector } from "react-redux"; // это уже готовые хуки
// useSelector - чтобы получить данные из State
// useDispatch - чтобы отправить данные в State

import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store/index"; // получаем наши типы

// делаем тот же самый хук только с типизацией
export const useAppDispatch: () => AppDispatch = useDispatch; // типизируем наши хуки
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // типизируем наши хуки