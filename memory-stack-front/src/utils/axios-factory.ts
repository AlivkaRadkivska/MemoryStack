export const revalidate = 3600;

import axios, { AxiosResponse } from 'axios';
import { getCookie } from './cookies-factory';
import { cache } from 'react';

const baseUrl = process.env.BACKEND_URL;

async function getHeaders() {
  const token = await getCookie('token');

  return {
    'Authorization': `${token ? 'Bearer ' + token : ''}`,
    'Content-Type': 'application/json',
  }
}

const sendAxiosRequest =  cache(async (
  req: Promise<AxiosResponse<any, any>>,
): Promise<AxiosResponse | { message: string[] }> => {
  try {
    const res = await req;

    return res;
  } catch(error) {
    if(axios.isAxiosError(error))
      return { message: error.response?.data.message };

    else {
      console.log(error);
      return { message: ['something went wrong, please try later'] };
    }
  }
});

export async function getData(
  path: string,
): Promise<AxiosResponse | { message: string[] }> {
  const headers = await getHeaders();

  const req = axios.get(
    `${baseUrl}${path}`, 
    { headers }
  );
  
  return sendAxiosRequest(req);
};

export async function postData(
  path: string,
  data: object,
): Promise<AxiosResponse | { message: string[] }> {
  const headers = await getHeaders();

  const req = axios.post(
    `${baseUrl}${path}`, 
    { ...data }, 
    { headers },
  );
  
  return sendAxiosRequest(req)
}

export async function patchData(
  path: string,
  data: object,
): Promise<AxiosResponse | { message: string[] }> {
  const headers = await getHeaders();

  const req = axios.patch(
    `${baseUrl}${path}`, 
    { ...data }, 
    { headers }
  );
  
  return sendAxiosRequest(req);
}

export async function deleteData(
  path: string,
): Promise<AxiosResponse | { message: string[] }> {
  const headers = await getHeaders();
  
  const req = axios.delete( 
    `${baseUrl}${path}`, 
    { headers }
  );
  
  return sendAxiosRequest(req);
}
