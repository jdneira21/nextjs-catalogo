'use client'
import { getCategorias } from '@/libs/query'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
export default function Sidebar() {
  const { data, isLoading } = useQuery({
    queryKey: ['categorias'],
    queryFn: getCategorias
  })

  return (
    <div className='tw-bg-blue-400'>
      {isLoading ? (
        'Cargando...'
      ) : (
        <>
          <Link href='/'>Inicio</Link>
          {data?.map((cat) => (
            <Link key={cat.id} href={`/categorias/${cat.slug}`}>
              {cat.nombre}
            </Link>
          ))}
        </>
      )}
    </div>
  )
}
