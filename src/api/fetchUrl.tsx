export const fetchGet = (url: string): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_URL_API}${url}`, {
    method: "GET",
    headers: {
      ["Content-Type"]: "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
};

export const fetchPost = (url: string, data: object): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_URL_API}${url}`, {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    body: JSON.stringify({
      data: data,
    }),
  });
};

export const fetchPut = (url: string, data: object): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_URL_API}${url}`, {
    method: "PUT",
    headers: {
      ["Content-Type"]: "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    body: JSON.stringify({
      data: data,
    }),
  });
};

export const fetchDelete = (url: string): Promise<any> => {
  return fetch(`${process.env.NEXT_PUBLIC_URL_API}${url}`, {
    method: "DELETE",
    headers: {
      ["Content-Type"]: "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
};
