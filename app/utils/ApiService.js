const BASE_URL = 'https://api.simplynoted.com';

async function addAuthorizationHeader(config) {
    const apiKey = localStorage.getItem('apiKey');
  if (apiKey) {
    config.headers['Authorization'] = 'Bearer ' + apiKey;
    config.headers['Cache-Control'] = 'no-cache';
  }
  return config;
}

export async function getApi(path, data) {
  const url = `${BASE_URL}/${path}`;
//   const headers = await addAuthorizationHeader();
  
  return await fetch(url, { method: 'GET' });
}

export async function postApi(path, data) {
  const url = `${BASE_URL}/${path}`;
  // const headers = await addAuthorizationHeader();
  return fetch(url, { method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }, body: JSON.stringify(data) });
}
export async function postApi1(path, data) {
  const url = `${BASE_URL}/${path}`;
//   const headers = await addAuthorizationHeader();

  return await fetch(url, { method: 'POST',  body: data });
}
