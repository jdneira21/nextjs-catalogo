import { writeFile } from 'fs/promises'

// import { readFileSync } from "fs";

export const uploadBase64Data = async (slug: string, thumbnail: string) => {
  // console.log('uploadBase64Data')
  const base64Data = thumbnail.replace('data:image/jpeg;base64,', '')
  try {
    // basePath = path.join(process.cwd(), ".next/server/chunks")

    // const templateDirectory = resolve(process.cwd(), 'extensions')
    // console.log(templateDirectory)
    // const emailTemplate = readFile(join(templateDirectory, slug, 'README.md'), 'utf8')

    await writeFile(`${process.cwd()}/public/${slug}.jpg`, base64Data, 'base64')
    // console.log(x)
    // console.log('uploadBase64Data uploadBase64Data')
    // console.log(process.cwd())
  } catch (error) {
    console.log(error)
  }
}
