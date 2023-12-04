import { Dialog, DialogTitle } from '@mui/material'
import useStore from '../store/useStore'
import FormCategory from './FormCategory'

export default function DialogNewCategory() {
  const stateDialogNewCategory = useStore((store) => store.stateDialogNewCategory)
  return (
    <Dialog maxWidth={'lg'} open={stateDialogNewCategory}>
      <DialogTitle className='!py-1 !px-2 !font-open-sans !text-[1.1rem]'>Categoría</DialogTitle>
      <FormCategory />
    </Dialog>
  )
}
