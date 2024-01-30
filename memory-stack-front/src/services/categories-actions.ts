'use server';
import { CategoryT } from '@/types/category';
import { deleteData, getData, postData, patchData } from '@/utils/axios-factory';
import { redirect } from 'next/navigation';

export async function getCategories(): Promise<CategoryT[] | { message: string[] }> {
  const res = await getData('/categories');
  
  if('data' in res)
    return res.data;

  return res;
}

export async function getCategory(
  id: string,
): Promise<CategoryT | { message: string[] }> {
  const res = await getData(`/categories/${id}`);
  
  if('data' in res)
    return res.data;

  return res;
}

export async function addCategory(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const name = payload.get('name') as string;

  const res = await postData('/categories', { name });

  if('message' in res)
    return { message: res.message };
  
  redirect('/categories');
}

export async function editCategory(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const id = payload.get('id') as string;
  const name = payload.get('name') as string;

  const res = await patchData(`/categories/${id}`, { name });

  if('message' in res)
    return { message: res.message };

  redirect('/categories');
}

export async function deleteCategory(
  id: string,
): Promise<{ message: string[] }> {
  const res = await deleteData(`/categories/${id}`);

  if('message' in res)
    return { message: res.message };

  redirect('/categories');
}
