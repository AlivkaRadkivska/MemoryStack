'use server';
import { postData } from '@/utils/axios-factory';
import { removeToken, saveToken } from '@/utils/token-handler';
import { redirect } from 'next/navigation';

export async function getCurrUser() {}

// ?
export async function signUp(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const confirmPassword = payload.get('confirm_password') as string;
  const data = {
    username: payload.get('username') as string,
    password: payload.get('password') as string,
  }

  if(data.password != confirmPassword)
    return { message: ['Password and confirm password are not equal'] }

  const res = await postData('/auth/signup', data);
  
  if('message' in res) {
    console.log(res.message);
    return { message: res.message }
  } else {
    saveToken(res.data.accessToken)
    redirect('/');
  }
}

export async function signIn(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const data = {
    username: payload.get('username') as string,
    password: payload.get('password') as string,
  }

  const res = await postData('/auth/signin', data);

  if('message' in res)
    return { message: res.message };
  else{
    saveToken(res.data.accessToken)
    redirect('/');
  }
}

export async function signOut() {
  removeToken();
  redirect('/');
}
