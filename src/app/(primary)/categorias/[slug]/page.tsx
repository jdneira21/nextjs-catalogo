'use client'

import { getCategoriasBySlug } from '@/libs/query'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function CategoryPageSlug() {
  const params = useParams()

  // console.log(params.slug)

  const { isPending, error, data } = useQuery({
    queryKey: ['categoriaSlug'],
    queryFn: () => getCategoriasBySlug(String(params.slug))
  })

  // useQuery({  })

  // console.log(data)

  return (
    <div>
      {data?.productos.map((prod) => (
        <>
          <div key={prod.id}>{prod.nombre}</div>
          <Image src={prod.imagen} width={700} height={400} alt={prod.nombre} />
        </>
      ))}
    </div>
  )
}
