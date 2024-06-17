'use server';
import { cookies } from 'next/headers';

const cookieOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
}

export async function setCookies(
  data: Array<{ key: string, value: string }>,
): Promise<void> {

  data.map((el) => {
    cookies().set(
      el.key, 
      el.value, 
      cookieOptions,
    );
  });
}

export async function deleteCookies(
  data: Array<string>,
): Promise<void> {
  data.map((el) => {
    cookies().delete(el);
  });
}

export async function getCookie(key: string): Promise<string | undefined> {
  const cookie = cookies().get(key)?.value;

  if (cookie?.length === 0)
    return undefined;
  return cookie;
}
