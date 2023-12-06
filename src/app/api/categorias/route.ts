import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

export async function GET() {
  const categorias = await prisma.categoria.findMany({
    where: { status: true },
    orderBy: { id: 'asc' },
    include: {
      productos: {
        include: {
          categoria: true,
          imagenes: true
        }
      }
    }
  })
  return NextResponse.json(categorias)
}

export async function POST(request: Request) {
  const { nombre } = await request.json()

  const category = await prisma.categoria.create({
    data: { nombre, slug: slugify(nombre, { lower: true }) }
  })

  return NextResponse.json(category)
}

export async function PUT(request: Request) {
  const { id, nombre } = await request.json()

  console.log('PUT')
  console.log({ id, nombre })

  const categoria = await prisma.categoria.update({
    where: { id },
    data: { nombre, slug: slugify(nombre, { lower: true }) }
  })

  return NextResponse.json(categoria)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const categoria = await prisma.categoria.update({
    where: { id },
    data: { status: false },
    include: { productos: true }
  })

  return NextResponse.json(categoria)
}
