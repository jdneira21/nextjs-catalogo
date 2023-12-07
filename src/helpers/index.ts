import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { ImgurClient } from 'imgur'
import { join } from 'path'

const client = new ImgurClient({
  clientId: '0970ce14bb1c7ba',
  clientSecret: 'aed8e22fdf08cd6b980abff9246f45b282e80348'
})

export const uploadBase64Data = async (slug: string, thumbnail: string): Promise<string> => {
  const base64Data = thumbnail.replace('data:image/jpeg;base64,', '')
  // const pathFile = `${process.cwd()}/tmp/${slug}.jpg`
  const pathFile = join(process.cwd(), `tmp/${slug}.jpg`)

  console.log(pathFile)
  await writeFile(pathFile, base64Data, 'base64')
  const response: any = await client.upload({
    image: createReadStream(pathFile),
    type: 'stream'
  })

  return response.data.link

  // console.log(x)

  try {
    // console.log(response.data);
    // basePath = path.join(process.cwd(), ".next/server/chunks")
    // const templateDirectory = resolve(process.cwd(), 'extensions')
    // console.log(templateDirectory)
    // const emailTemplate = readFile(join(templateDirectory, slug, 'README.md'), 'utf8')
    // const pathFile = `${process.cwd()}/public/${slug}.jpg`
    // const response = await client.upload({
    //   album: createReadStream(base64Data, 'base64url'),
    //   type: 'stream'
    // })
    // console.log(response)
    // await writeFile(pathFile, base64Data, 'base64')
    // console.log(x)
    // console.log('uploadBase64Data uploadBase64Data')
    // console.log(process.cwd())
  } catch (error) {
    console.log(error)
  }
}
