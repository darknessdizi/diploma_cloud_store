interface IFetchParams {
  url: string,
  headers?: {},
  method?: string,
  body?: string | FormData,
}

export async function baseFetch({ url, headers, method="GET", body }: IFetchParams) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });

    if (method === "DELETE") {
      return response;
    }

    return await response.json();
  } catch(err) {
    throw new Error(err.message);
  }
}