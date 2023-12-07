import { uploadBase64Data } from '@/helpers'
import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

export async function GET() {
  const notes = await prisma.producto.findMany({
    include: {
      categoria: true
    },
    where: { status: true },
    orderBy: { id: 'desc' }
  })
  return NextResponse.json(notes)
}

export async function POST(request: Request) {
  const { nombre, precio, descripcion, imagenBase64, categoria_id } = await request.json()

  console.log({ nombre, precio, descripcion, categoria_id })

  const slug = slugify(nombre, { lower: true })

  console.log(slug)
  console.log('slug')

  uploadBase64Data(slug, imagenBase64)

  console.log('uploadBase64Data(slug, imagenBase64)')

  // const category = await prisma.categoria.create({
  //   data: { nombre, slug: slugify(nombre, { lower: true }) }
  // })

  const producto = await prisma.producto.create({
    data: {
      nombre,
      precio: +precio,
      descripcion,
      imagen: slug + '.jpg',
      imagenBase64: '',
      categoria_id,
      slug: slug
    },
    include: { categoria: true }
  })

  return NextResponse.json(producto)
}

export async function PUT(request: Request) {
  const { id, nombre, precio, descripcion, imagen, imagenBase64, categoria_id } = await request.json()

  const slug = slugify(nombre, { lower: true })

  if (imagenBase64) {
    uploadBase64Data(slug, imagenBase64)
  }

  const producto = await prisma.producto.update({
    where: { id },
    data: {
      nombre,
      precio: +precio,
      descripcion,
      imagen: !imagenBase64 ? imagen : slug + '.jpg',
      imagenBase64: '',
      categoria_id,
      slug: slug
    },
    include: { categoria: true }
  })

  return NextResponse.json(producto)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const producto = await prisma.producto.update({
    where: { id },
    data: { status: false },
    include: { categoria: true }
  })

  return NextResponse.json(producto)
}


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };