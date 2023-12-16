'use client'
import { getProductos } from '@/libs/query'
import { Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import useStore from '@/store/useStore'
import { BsFillCartPlusFill } from 'react-icons/bs'

export default function PrimaryPage() {
  const addCart = useStore((state) => state.addCart)
  const { isPending, error, data } = useQuery({
    queryKey: ['productos'],
    queryFn: getProductos
  })
  return (
    <div className='tw-grid tw-grid-cols-1 md:tw-grid-cols-3 sm:tw-grid-cols-2 xl:tw-grid-cols-5 tw-gap-4 tw-pt-[3.6rem]'>
      {data?.map((prod) => (
        <div key={prod.id} className='tw-flex tw-flex-col tw-gap-2 tw-shadow-md tw-rounded tw-p-1'>
          <Image src={prod.imagen} className='revealing-image tw-rounded tw-border-2 tw-border-white'
            width={0}
            height={0}
            style={{ width: 'auto', height: '200px' }}
            sizes="100vw" alt={''}
          />
          <div className='tw-font-bold tw-text-[1.1rem]'>{prod.nombre}</div>
          <div className='tw-text-center tw-font-bold'>S/. {prod.precio}</div>
          <div className='tw-text-base tw-leading-none'>{prod.descripcion}</div>
          <Button
            onClick={() => addCart(prod)}
            endIcon={<BsFillCartPlusFill />}
            variant='contained'
            size='medium'
            className='tw-w-full'
            disableElevation>
            Agregar al carrito
          </Button>
        </div>
      ))}
    </div>







  )
}
