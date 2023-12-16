import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { RiCloseCircleFill } from 'react-icons/ri'
import { TbSquareRoundedCheckFilled } from 'react-icons/tb'
import { FaWhatsapp } from 'react-icons/fa'
import useStore from '@/store/useStore'


export default function DialogFinalProducts() {
  const stateDialogFinalProduct = useStore(state => state.stateDialogFinalProduct)
  const setStateDialogFinalProduct = useStore(state => state.setStateDialogFinalProduct)
  const cart = useStore(state => state.cart)

  const confirm = () => {
    const xx = cart.map(c => ` ${c.cantidad} ${c.nombre.toString()}`)
    console.log(xx.toString())

    window.open(`https://api.whatsapp.com/send?phone=980939260&text=${xx.toString()}`, '_blank')

    // https://api.whatsapp.com/send?phone=980939260&text=dsdasdas
  }

  // https://api.whatsapp.com/send?phone=980939260&text=dsdasdas

  return (
    <Dialog maxWidth={'lg'} open={stateDialogFinalProduct}>
      <DialogTitle className='!tw-py-1 !tw-px-2 !tw-font-open-sans tw-text-center !tw-text-[1.1rem]'>
        Productos
      </DialogTitle>
      <DialogContent className='!py-2 !px-1.5 flex flex-col'>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell> - </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    {row.nombre}
                  </TableCell>
                  <TableCell>
                    {row.cantidad}
                  </TableCell>
                  {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </DialogContent>
      <DialogActions className='!tw-flex !tw-justify-between tw-col-span-full'>
        <Button
          onClick={() => setStateDialogFinalProduct(false)}
          startIcon={<RiCloseCircleFill />}
          className='!tw-capitalize'
          disableElevation
          variant='outlined'>
          Cancelar
        </Button>
        <Button
          onClick={confirm}
          startIcon={<FaWhatsapp />}
          className='!tw-capitalize !tw-bg-green-600'
          disableElevation
          // disabled={disabled}
          variant='contained'>
          Confirmar Pedido !
        </Button>
      </DialogActions>
    </Dialog>
  )
}
