import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

export async function GET() {
  const categorias = await prisma.categoria.findMany({
    where: { status: true },
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

  console.log({ id, nombre })

  const categoria = await prisma.categoria.update({
    where: { id },
    data: { nombre, slug: slugify(nombre, { lower: true }) }
  })

  console.log(categoria)

  // const categoriaUpdate = await prisma.categoria.update({
  //   where: { id: categoria?.id },
  //   data: { nombre , slug: slugify(nombre, { lower: true }) },
  // });

  // console.log(categoriaUpdate)

  return NextResponse.json(categoria)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const categoria = await prisma.categoria.update({
    where: { id },
    data: { status: false },
    include: { productos: true }
  })

  console.log(id)
  console.log(categoria)

  return NextResponse.json(categoria)
}

// async eliminarCategoria(id: string): Promise<Categoria> {
//   console.log(id);
//   return await this.prisma.categoria.update({
//     where: { id: +id },
//     data: { status: false },
//     include: { productos: true },
//   });
// }
