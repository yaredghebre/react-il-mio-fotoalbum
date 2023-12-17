async function fetchApi(path, method = 'GET', body = null) {
  try {
    const resp = await fetch(import.meta.env.VITE_API_URL + path, {
      method,
      headers: {
        'Content-Type': body instanceof FormData ? null : 'application/json',
        Authorization: localStorage.getItem('token')
          ? `Bearer ${localStorage.getItem('token')}`
          : null,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await resp.json();

    if (!resp.ok) {
      if (data.error === 'TokenExpiredError' || data.error === 'AuthError') {
        localStorage.removeItem('token');
        window.location = '/login';
      }

      throw new Error(
        data.message ??
          "A causa di un errore non è possibile eseguire l'operazione richiesta.",
      );
    }

    return data;
  } catch (err) {
    throw err;
  }
}

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
