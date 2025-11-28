import { getToken } from "config";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_VERSION = process.env.REACT_APP_API_VERSIONL;
export const API_BASE_URL = `${BASE_URL}/${API_VERSION}/`;

async function postData(route: string, data: object, token = false) {
  const headers = {
    "Content-Type": "application/json",
    Apikey: "tecvinsonABapiKeyeventMatchaUser",
    "access-control-request-headers": "apikey,content-type",

    ...(token && { Authorization: `Bearer ${getToken()}` }),
  };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(`${API_BASE_URL}${route}`, requestOptions);
  console.log(response, "response");
  return response?.json();
}

async function putData(route: string, data: never, token = false) {
  const headers = {
    "Content-Type": "application/json",
    Apikey: "tecvinsonABapiKeyeventMatchaUser",

    ...(token && { Authorization: `Bearer ${getToken()}` }),
  };

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(`${API_BASE_URL}${route}`, requestOptions);
  return response?.json();
}

async function postFile(route: string, data: FormData) {
  const t = getToken();
  const requestOptions = {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${t}`,
      Apikey: "tecvinsonABapiKeyeventMatchaUser",
    },
  };

  const response = await fetch(`${API_BASE_URL}${route}`, requestOptions);
  return response?.json();
}

async function putFile(route: string, data: never) {
  const t = getToken();
  const requestOptions = {
    method: "PUT",
    body: data,
    headers: {
      Authorization: `Bearer ${t}`,
      Apikey: "tecvinsonABapiKeyeventMatchaUser",
    },
  };

  const response = await fetch(`${API_BASE_URL}${route}`, requestOptions);
  return response?.json();
}

async function getData(
  route: string,
  token = false,
  params: Record<string, never> = {},
  reqHeaders = true
) {
  // Construct query string from params object
  const queryString = new URLSearchParams(params).toString();

  // Append query string to the route if it's not empty
  const fullRoute = queryString ? `${route}?${queryString}` : route;

  const headers = {
    "Content-Type": "application/json",
    Apikey: "tecvinsonABapiKeyeventMatchaUser",

    ...(token && { Authorization: `Bearer ${getToken()}` }),
  };

  const requestOptions = {
    headers: reqHeaders ? headers : {},
  };

  const response = await fetch(`${API_BASE_URL}${fullRoute}`, requestOptions);

  return response?.json();
}

async function deleteData(route: string, token = false, reqHeaders = true) {
  const headers = {
    "Content-Type": "application/json",
    Apikey: "tecvinsonABapiKeyeventMatchaUser",

    ...(token && { Authorization: `Bearer ${getToken()}` }),
  };

  const requestOptions = {
    headers: reqHeaders ? headers : {},
    method: "DELETE",
  };

  const response = await fetch(`${API_BASE_URL}${route}`, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response?.json();
}

export { postData, postFile, getData, putData, deleteData, putFile };
