import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const notes = await prisma.user.findMany()
  return NextResponse.json(notes)
}
