import { IFetchParams } from "../models/index";

export async function baseFetch({ url, headers, method="GET", body, blob=false }: IFetchParams) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });

    console.log('ответ на fetch (src/utils/index/baseFetch)', response);
    if ((response.status === 205) || (method === "DELETE")) {
      return response;
    }

    if (blob) {
      return await response.blob();
    }

    return await response.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
