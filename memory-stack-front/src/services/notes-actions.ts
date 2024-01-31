'use server';
import { NoteT } from '@/types/note';
import { deleteData, getData, postData, patchData } from '@/utils/axios-factory';
import { redirect } from 'next/navigation';
import { getCategory } from './categories-actions';

export async function getNotes(): Promise<NoteT[] | { message: string[] }> {
  const res = await getData('/notes');
  
  if('data' in res)
    return res.data;
  return res;
}

export async function getNote(
  id: string,
): Promise<NoteT | { message: string[] }> {
  const res = await getData(`/notes/${id}`);
  
  if('data' in res)
    return res.data;
  return res;
}

export async function addNote(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const category = await getCategory(payload.get('category_id') as string);

  const data = {
    title: payload.get('title') as string,
    content: payload.get('content') as string,
    date: payload.get('date') as unknown as Date,
    category: category,
  }
  
  const res = await postData('/notes', data);

  if('message' in res)
    return { message: res.message };
  else
    redirect('/notes');
}

export async function editNote(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const id = payload.get('id') as string;
  const category = await getCategory(payload.get('category_id') as string);

  const data = {
    title: payload.get('title') as string,
    content: payload.get('content') as string,
    date: payload.get('date') as unknown as Date,
    category: category,
  }

  const res = await patchData(`/notes/${id}`, data);

  if('message' in res)
    return { message: res.message };
  else
    redirect('/notes');
}

export async function deleteNote(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const id = payload.get('id') as string;
  const res = await deleteData(`/notes/${id}`);

  if('message' in res)
    return { message: res.message };
  else
    redirect('/notes');
}
