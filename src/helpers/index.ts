import { writeFile } from 'fs/promises';

export const uploadBase64Data = async (slug: string, thumbnail: string) => {
  console.log('uploadBase64Data')
  const base64Data = thumbnail.replace('data:image/jpeg;base64,', '');
  await writeFile(`public/${slug}.jpg`, base64Data, 'base64');
};
