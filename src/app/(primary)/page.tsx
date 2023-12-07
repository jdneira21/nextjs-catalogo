'use client'
import { getProductos } from '@/libs/query'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export default function PrimaryPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ['productos'],
    queryFn: getProductos
  })
  return (
    <div className='tw-border tw-border-red-600'>
      {/* <Image src={`https://i.imgur.com/gI4nMgO.jpg`} alt='' width={700} height={400} priority /> */}
      {data?.map((prod) => (
        <div key={prod.id}>
          <Image src={`${prod.imagen}`} alt='' width={700} height={400} priority />
        </div>
      ))}
    </div>
  )
}
