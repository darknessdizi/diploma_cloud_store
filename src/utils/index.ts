import { IFetchParams } from "../models/index";

// Основа для функции fetch 
export async function baseFetch({ url, headers, method="GET", body, blob=false }: IFetchParams) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
      credentials: 'include'
    });

    if (response.status >= 400) {
      const json = await response.json();
      throw new Error(json.error);
    }

    if ((response.status === 205) || (method === "DELETE")) {
      return response;
    }

    if (blob) {
      return await response.blob();
    }

    return await response.json();
  } catch (err: any) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Нет соединения с сервером');
    }
    throw new Error(err.message);
  }
}

function _addZero(number: number) {
  // делает число двухзначным
  let result: string | number = number;
  if (result < 10) {
    result = `0${result}`;
  }
  return result;
}

export function getDate(timestamp: string) {
  // Возвращает строку с датой
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = _addZero(date.getMonth() + 1);
  const day = _addZero(date.getDate());
  const hours = _addZero(date.getHours());
  const minutes = _addZero(date.getMinutes());
  return `${hours}:${minutes} ${day}.${month}.${year}`;
}
