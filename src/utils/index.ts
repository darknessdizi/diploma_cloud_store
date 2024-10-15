import { IFetchParams } from "../models/index";

export async function baseFetch({ url, headers, method="GET", body, blob=false }: IFetchParams) {
  try {
    const token = localStorage.getItem('sessionToken');
    console.log('token', token)
    let fullHeaders = null;
    if ((token !== 'undefined') && (token !== null)) {
      fullHeaders = { 'Authorization': token, ...headers }
    } else {
      fullHeaders = { ...headers }
    }

    const response = await fetch(url, {
      method: method,
      headers: { ...fullHeaders },
      body: body,
    });

    console.log('Функция baseFetch: ответ на fetch (src/utils/index/baseFetch)', response);
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
