import axios from 'axios';


//const API_BASE = 'http://sunildrdms-001-site1.dtempurl.com/api/';

const API_BASE = 'http://smart-force.in:88/api/';

const headers = {
  'Content-Type': 'application/json',
  'Ocp-Apim-Subscription-Key': 'ee133dc58c6d47c5a32cdaea7490820c',
  'Ocp-Apim-Trace': true,
  'accept': '*/*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
};

export async function getRequest (path, params) {
  const res = await axios.get (API_BASE + path, {headers, params});
  return res;
}

export async function postRequest (path, body) {
  const res = await axios.post (API_BASE + path, body, {headers});
  return res;
}

export async function putRequest (path, body) {
  const res = await axios.put (API_BASE + path, body, {headers});
  return res;
}

export async function deleteRequest (path, params) {
  const res = await axios.delete (API_BASE + path,{headers,params});
  return res;
}
