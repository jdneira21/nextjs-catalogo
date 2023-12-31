import { eliminarCategoria, queryClient } from '@/libs/query'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'
import { TbSquareRoundedCheckFilled } from 'react-icons/tb'
import { ICategoria } from '../interfaces'
import useStore from '../store/useStore'

export default function DialogDeleteCategory() {
  const [disabled, setDisabled] = useState(false)
  const stateDialogDeleteCategory = useStore((state) => state.stateDialogDeleteCategory)
  const setStateDialogDeleteCategory = useStore((state) => state.setStateDialogDeleteCategory)
  const objDeleteCategory = useStore((store) => store.objDeleteCategory)

  const { mutateAsync: deleteCategory } = useMutation({
    mutationKey: ['eliminarCategoria'],
    mutationFn: eliminarCategoria
  })

  const confirmDeleteCategory = () => {
    setDisabled(true)

    deleteCategory(
      { id: objDeleteCategory.id },
      {
        onSuccess: () => {
          setStateDialogDeleteCategory(false, {} as ICategoria)
          queryClient.prefetchQuery({ queryKey: ['categorias'] })
          setDisabled(false)
        }
      }
    )
  }

  return (
    <Dialog maxWidth={'lg'} open={stateDialogDeleteCategory}>
      <DialogTitle className='!tw-py-1 !tw-px-2 !tw-font-open-sans !tw-text-[1.1rem]'>
        Confirmar Eliminar Categoría <b>{objDeleteCategory.nombre}</b>
      </DialogTitle>
      {/* <DialogContent className='!py-2 !px-1.5 flex flex-col'>Confirmar</DialogContent> */}
      <DialogActions className='!tw-flex !tw-justify-between tw-col-span-full'>
        <Button
          onClick={() => setStateDialogDeleteCategory(false)}
          startIcon={<RiCloseCircleFill />}
          className='!tw-capitalize'
          disableElevation
          variant='outlined'>
          Cancelar
        </Button>
        <Button
          onClick={confirmDeleteCategory}
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
