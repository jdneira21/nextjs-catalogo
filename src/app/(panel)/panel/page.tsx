'use client'
import DialogCategory from '@/components/DialogCategory'
import Table from '@/components/Table'
import useStore from '@/store/useStore'
import { Button } from '@mui/material'

export default function PagePanel() {
  const setStateDialogCategory = useStore((state) => state.setStateDialogCategory)
  const setStateDialogProduct = useStore((state) => state.setStateDialogProduct)
  return (
    <>
      <div className='tw-flex tw-flex-col tw-gap-4 tw-p-2'>
        <div className='tw-flex tw-gap-2'>
          <Button
            onClick={() => setStateDialogCategory(true)}
            variant='contained'
            disableElevation
            size='small'
            className='!tw-capitalize'>
            Categorías
          </Button>
          <Button
            onClick={() => setStateDialogProduct(true)}
            variant='contained'
            disableElevation
            size='small'
            className='!tw-capitalize'>
            Nuevo Producto
          </Button>
          <Button variant='contained' disableElevation size='small' className='!tw-capitalize'>
            Config WhatsApp
          </Button>
        </div>
        <Table />
        {/* <div>
      </div> */}
      </div>
      <DialogCategory />
    </>
  )
}
