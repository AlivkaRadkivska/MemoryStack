import { v4 as uuid } from "uuid";
import { put, del } from "@vercel/blob";

function getNewImageName(name: string) {
  let newName = uuid();
  return newName + name.substring(name.lastIndexOf("."), name.length);
}

export async function uploadImage(
  image: File
): Promise<{ image: string } | { message: string }> {
  if (!image.type.startsWith("image"))
    return { message: "provide image please" };

  const newImageName = getNewImageName(image.name);

  try {
    const blob = await put(newImageName, image, {
      access: "public",
    });
    return { image: blob.url };
  } catch (error) {
    console.log(error);
    return { message: "Щось пішло не так." };
  }
}

export async function deleteImage(image: string): Promise<void> {
  try {
    del(image);
  } catch (error) {
    console.log(error);
  }
}
