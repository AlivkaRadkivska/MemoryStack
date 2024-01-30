import axios, { AxiosResponse } from 'axios';

//! move to env
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlYSI' +
  'sImlhdCI6MTcwNjU2Njk5MywiZXhwIjoxNzA3MTcxNzkzfQ.aJYpMUT0nl-lk1_2J--6m5EmWXOiB_4wck0D15mfIR4';
//! move to env
const baseUrl = 'http://localhost:3001';

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
}

async function sendAxiosRequest(
  req: Promise<AxiosResponse<any, any>>,
): Promise<AxiosResponse | { message: string[] }> {
  try{
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
}

export async function getData(
  path: string,
): Promise<AxiosResponse | { message: string[] }> {
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
  const req = axios.delete( 
    `${baseUrl}${path}`, 
    { headers }
  );
  
  return sendAxiosRequest(req);
}
