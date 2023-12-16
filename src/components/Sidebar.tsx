'use client'
import { getCategorias } from '@/libs/query'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { slide as Menu, State } from 'react-burger-menu'
import { TiThMenu } from 'react-icons/ti'

import useStore from '@/store/useStore'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { Button } from '@mui/material'
import DialogFinalProducts from './DialogFinalProducts'

export default function Sidebar() {
  const totalProducts = useStore((state) => state.getTotalProducts())
  const setStateDialogFinalProduct = useStore(state => state.setStateDialogFinalProduct)
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useQuery({
    queryKey: ['categorias'],
    queryFn: getCategorias
  })

  const handleStateChange = (state: State) => {
    setOpen(state.isOpen)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  return (
    <>
      <div className='tw-bg-[#862224] tw-w-full tw-flex tw-gap-2 tw-rounded tw-py-2 tw-px-2 tw-content-center tw-place-items-center tw-fixed tw-z-50'>
        {isLoading ? (
          'Cargando...'
        ) : (
          <>
            <Menu
              isOpen={open}
              // customBurgerIcon={false}
              // customCrossIcon={<Icon color="#f04" name="close" />}
              customBurgerIcon={<TiThMenu />}
              onStateChange={(state) => handleStateChange(state)}
              // isOpen={sidebarOpen}
              // onStateChange={handleStateChange}
              pageWrapId="innerContainer"
              styles={{
                bmOverlay: {
                  backgroundColor: '#86222457',
                  overflow: 'hidden',
                  left: '0',
                  top: '0',
                },
                bmMenuWrap: {
                  position: 'fixed',
                  overflow: 'hidden',
                  height: '100%',
                  top: '0',
                  left: '0',
                },
              }}
              width={240}
            >
              <Link href='/' onClick={closeMenu}>Inicio</Link>
              {data?.map((cat) => (
                <Link key={cat.id} href={`/categorias/${cat.slug}`} onClick={closeMenu}>
                  {cat.nombre}
                </Link>
              ))}
            </Menu>
          </>
        )}
        <span className='spanLogo'>Leña & Carbon Dos Brujas</span>

        <span className='tw-flex tw-content-center tw-place-items-center'>
          {/* <BsFillCartPlusFill />{totalProducts} */}
          <Button
            onClick={() => setStateDialogFinalProduct(true)}
            startIcon={<BsFillCartPlusFill />}
            variant='contained'
            color='inherit'
            size='small'
            className='bounce !tw-font-bold !tw-text-[1rem]'
            disableElevation>
            {totalProducts}
          </Button>
        </span>
      </div>
      <DialogFinalProducts />
    </>
  )
}
