import axios from "axios";

export const mockapi = axios.create({
  baseURL: "http://localhost:31299/api",
  timeout: 1000,
  validateStatus: (status) => status >= 200 && status < 300,
});

export const requestFx = (request: any) => {
  const selectedApi = mockapi;

  return selectedApi({
    method: request.method,
    url: request.path,
    data: request.body,
  })
    .then((response) => response.data)
    .catch((response) => Promise.reject(response.response.data));
};

export interface SignIn {
  email: string;
  password: string;
}

export const moviesapi = axios.create({
  baseURL: "https://freetestapi.com/api/v1",
  validateStatus: (status) => status >= 200 && status < 300,
});

export const moviesFx = (request: any) => {
  const selectedApi = moviesapi;

  return selectedApi({
    method: request.method,
    url: request.path,
    data: request.body,
    headers: request.headers,
    params: request.params,
  })
    .then((response) => response.data)
    .catch((response) => Promise.reject(response.response.data));
};
