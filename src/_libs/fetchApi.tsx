import axios, { AxiosError, AxiosResponse } from "axios";

export interface AxiosErrRes {
  err: boolean;
  code: number;
  msg: string;
  data: any;
}

const fetchApi = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

fetchApi.interceptors.request.use(
  async (config) => {
    // const token = await getCookie()

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

fetchApi.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (err) => {
    // if (err.status === 401) {
    //   window.location.href = "/administrator/auth/signin";
    //   // redirect('/administrator/auth/signin')
    //   // href
    // }
    const resErr: AxiosErrRes = {
      err: true,
      code: 0,
      msg: '',
      data: null
    }
    if (err instanceof AxiosError) {
      resErr.msg = err.response?.data?.message || err.message;
      resErr.code = err.status ? err.status : 0;
    }

    return Promise.reject(resErr);
  },
);

export { fetchApi };