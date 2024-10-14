import { IFetchParams } from "../models/index";

export async function baseFetch({ url, headers, method="GET", body, blob=false }: IFetchParams) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });

    if (response.status >= 400) {
      const json = await response.json();
      throw new Error(json.error);
    }

    console.log('ответ на fetch (src/utils/index/baseFetch)', response);
    if ((response.status === 205) || (method === "DELETE")) {
      return response;
    }

    if (blob) {
      return await response.blob();
    }

    return await response.json();
  } catch (err: any) {
    console.log('error', err)
    if (err.message === 'Failed to fetch') {
      throw new Error('Нет соединения с сервером');
    }
    throw new Error(err.message);
  }
}
