import { IProducto } from '@/interfaces'
import { eliminarProducto, queryClient } from '@/libs/query'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'
import { TbSquareRoundedCheckFilled } from 'react-icons/tb'
import useStore from '../store/useStore'

export default function DialogDeleteProduct() {
  const [disabled, setDisabled] = useState(false)
  const stateDialogDeleteProduct = useStore((state) => state.stateDialogDeleteProduct)
  const setStateDialogDeleteProduct = useStore((state) => state.setStateDialogDeleteProduct)
  const objDeleteProduct = useStore((store) => store.objDeleteProduct)

  const { mutateAsync: deleteProduct } = useMutation({
    mutationKey: ['eliminarProducto'],
    mutationFn: eliminarProducto
  })

  const confirmDeleteProduct = () => {
    console.log('confirmDeleteProduct')
    setDisabled(true)

    deleteProduct(
      { id: objDeleteProduct.id },
      {
        onSuccess: () => {
          setStateDialogDeleteProduct(false, {} as IProducto)
          queryClient.prefetchQuery({ queryKey: ['productos'] })
          setDisabled(false)
        }
      }
    )
  }

  return (
    <Dialog maxWidth={'lg'} open={stateDialogDeleteProduct}>
      <DialogTitle className='!tw-py-1 !tw-px-2 !tw-font-open-sans !tw-text-[1.1rem]'>
        Confirmar Eliminar Producto <b>{objDeleteProduct.nombre}</b>
      </DialogTitle>
      {/* <DialogContent className='!py-2 !px-1.5 flex flex-col'>Confirmar</DialogContent> */}
      <DialogActions className='!tw-flex !tw-justify-between tw-col-span-full'>
        <Button
          onClick={() => setStateDialogDeleteProduct(false)}
          startIcon={<RiCloseCircleFill />}
          className='!tw-capitalize'
          disableElevation
          variant='outlined'>
          Cancelar
        </Button>
        <Button
          onClick={confirmDeleteProduct}
          startIcon={<TbSquareRoundedCheckFilled />}
          className='!tw-capitalize'
          disableElevation
          disabled={disabled}
          variant='contained'>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
