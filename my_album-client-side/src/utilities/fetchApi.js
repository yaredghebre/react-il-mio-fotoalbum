const fetchApi = async (path, method = 'GET', body = null) => {
  try {
    // debugger;
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token missing');
    }

    const resp = await fetch(import.meta.env.VITE_API_URL + path, {
      method,
      headers: {
        'Content-Type': body instanceof FormData ? null : 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(
        data.message ??
          "A causa di un errore non è possibile eseguire l'accesso",
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default fetchApi;

// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:3000',
//   timeout: 1000,
//   headers: { 'X-Custom-Header': 'foobar' },
// });

// instance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.removeItem('token');
//       window.location = '/login';
//     }

//     return Promise.reject(error);
//   },
// );

// export default instance;
