import { Dialog, DialogTitle } from '@mui/material'
import useStore from '../store/useStore'
import FormProduct from './FormProduct'

export default function DialogProduct() {
  const stateDialogProduct = useStore((state) => state.stateDialogProduct)
  return (
    <Dialog maxWidth={'sm'} fullWidth open={stateDialogProduct}>
      <DialogTitle className='!py-1 !px-2 !font-open-sans !text-[1.1rem]'>Producto</DialogTitle>
      <FormProduct />
    </Dialog>
  )
}
