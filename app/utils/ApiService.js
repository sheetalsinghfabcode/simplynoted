const BASE_URL = 'https://testapi.simplynoted.com';

async function addAuthorizationHeader(config) {
    const apiKey = localStorage.getItem('apiKey');
//   console.log(apiKey, 'aaaaxxxxxx', config.url);
  if (apiKey) {
    config.headers['Authorization'] = 'Bearer ' + apiKey;
    config.headers['Cache-Control'] = 'no-cache';
  }
  return config;
}

export async function getApi(path, data) {
  const url = `${BASE_URL}/${path}`;
//   const headers = await addAuthorizationHeader();
  
  return fetch(url, { method: 'GET' });
}

export async function postApi(path, data) {
  console.log(path, data);
  const url = `${BASE_URL}/${path}`;
  const headers = await addAuthorizationHeader();

  return fetch(url, { method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }, headers, body: JSON.stringify(data) });
}
export async function postApi1(path, data) {
  console.log(path, data);
  const url = `${BASE_URL}/${path}`;
//   const headers = await addAuthorizationHeader();

  return fetch(url, { method: 'POST',  body: data });
}