// import { useRouter } from 'next/router'
import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  // const router = useRouter()
  const slug = params.slug

  const productsBySlug = await prisma.categoria.findFirst({
    where: { slug },
    orderBy: { id: 'asc' },
    include: { productos: { where: { status: true } } }
  })

  // console.log(productsBySlug)

  return NextResponse.json(productsBySlug)
}

// export async function GET(request: Request, { params }: { params: { slug: string } }) {
//   const slug = params.slug // 'a', 'b', or 'c'
// }
