import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

export async function GET() {
  // const notes = await prisma.categoria.findMany()
  // console.log(notes)
  return NextResponse.json({ msg: 'conchatumadre' })
}

export async function POST(request: Request) {
  const { nombre } = await request.json()

  const category = await prisma.categoria.create({
    data: { nombre, slug: slugify(nombre, { lower: true }) }
  })

  return NextResponse.json(category)
}
