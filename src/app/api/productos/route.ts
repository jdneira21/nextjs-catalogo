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
  const { nombre, precio, descripcion, imagen, categoria_id } = await request.json()

  console.log({ nombre, precio, descripcion, imagen, categoria_id })

  const slug = slugify(nombre, { lower: true })

  console.log(slug)
  console.log('slug')

  // const imagex = await uploadBase64Data(slug, imagenBase64)

  console.log('uploadBase64Data(slug, imagenBase64)')

  // const category = await prisma.categoria.create({
  //   data: { nombre, slug: slugify(nombre, { lower: true }) }
  // })

  const producto = await prisma.producto.create({
    data: {
      nombre,
      precio: +precio,
      descripcion,
      imagen,
      categoria_id,
      slug: slug
    },
    include: { categoria: true }
  })

  return NextResponse.json(producto)
}

export async function PUT(request: Request) {
  const { id, nombre, precio, descripcion, imagen, categoria_id } = await request.json()

  const slug = slugify(nombre, { lower: true })

  // if (imagenBase64) {
  //   uploadBase64Data(slug, imagenBase64)
  // }

  const producto = await prisma.producto.update({
    where: { id },
    data: {
      nombre,
      precio: +precio,
      descripcion,
      imagen: imagen,
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
