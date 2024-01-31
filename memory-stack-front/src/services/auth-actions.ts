'use server';
import { postData } from '@/utils/axios-factory';
import { deleteCookies, setCookies } from '@/utils/cookies-factory';
import { redirect } from 'next/navigation';

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
  
  if('message' in res)
    return { message: res.message }
  else {
    await setCookies([
      { key: 'token', value: res.data.accessToken }, 
      { key: 'username', value: res.data.user.username },
    ]);
    redirect('/');
  }
}

export async function logIn(
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
  else {
    await setCookies([
      { key: 'token', value: res.data.accessToken }, 
      { key: 'username', value: res.data.user.username },
    ]);
    redirect('/');
  }
}

export async function logOut(
  _state: { message: string[] }, 
  _payload: FormData,
): Promise<{ message: string[] }> {
  await deleteCookies(['username', 'token']);
  redirect('/');
}
