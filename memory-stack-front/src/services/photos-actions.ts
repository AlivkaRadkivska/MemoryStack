'use server';
import { PhotoT } from '@/types/photo';
import { deleteData, getData, postData, patchData } from '@/utils/axios-factory';
import { redirect } from 'next/navigation';
import { getCategory } from './categories-actions';
import { deleteImage, uploadImage } from '@/utils/file-handler';
import { FiltersT } from '@/types/filters';

export async function getPhotos(filters?: FiltersT): Promise<PhotoT[] | { message: string[] }> {
  let path = '/photos';
  if(filters?.categoryId) path += `?categoryId=${filters?.categoryId}`;
  if(filters?.search) path += `?search=${filters?.search}`;

  const res = await getData(path);
  
  if('data' in res)
    return res.data;
  return res;
}

export async function getPhoto(
  id: string,
): Promise<PhotoT | { message: string[] }> {
  const res = await getData(`/photos/${id}`);
  
  if('data' in res)
    return res.data;
  return res;
}

export async function addPhoto(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const category = await getCategory(payload.get('category_id') as string);

  const photo: File | null = payload.get('name') as unknown as File;

  const uploadedPhoto = await uploadImage(photo);
  if('message' in uploadedPhoto)
    return { message: [uploadedPhoto.message] };

  const data = {
    caption: payload.get('caption') as string,
    name: uploadedPhoto.imageName,
    date: payload.get('date') as unknown as Date,
    category: category,
  }
  const res = await postData('/photos', data);

  if('message' in res)
    return { message: res.message };
  else
    redirect('/photos');
}

export async function editPhoto(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const id = payload.get('id') as string;
  const category = await getCategory(payload.get('category_id') as string);

  const photo: File | null = payload.get('name') as unknown as File;
  let name = payload.get('old_name') as string;
  
  if(photo.size > 0) {
    const uploadedPhoto = await uploadImage(photo);

    if('message' in uploadedPhoto)
      return { message: [uploadedPhoto.message] };
    else {
      deleteImage(name);
      name = uploadedPhoto.imageName;
    }
  }

  const data = {
    caption: payload.get('caption') as string,
    name,
    date: payload.get('date') as unknown as Date,
    category: category,
  }

  const res = await patchData(`/photos/${id}`, data);

  if('message' in res)
    return { message: res.message };
  else
    redirect('/photos');
}

export async function deletePhoto(
  _state: { message: string[] }, 
  payload: FormData,
): Promise<{ message: string[] }> {
  const id = payload.get('id') as string;
  const photoName = payload.get('name') as string;
  const res = await deleteData(`/photos/${id}`);
  await deleteImage(photoName);

  if('message' in res)
    return { message: res.message };
  else
    redirect('/photos');
}
