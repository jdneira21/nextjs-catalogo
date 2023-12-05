'use client'
import { getCategorias } from '@/libs/query'
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'
import useStore from '../store/useStore'

export default function DialogCategory() {
  const stateDialogCategory = useStore((state) => state.stateDialogCategory)
  const setStateDialogCategory = useStore((state) => state.setStateDialogCategory)
  const setStateDialogNewCategory = useStore((store) => store.setStateDialogNewCategory)
  const setStateDialogDeleteCategory = useStore((store) => store.setStateDialogDeleteCategory)
  const setCategories = useStore((store) => store.setCategories)
  const { data, isLoading } = useQuery({
    queryKey: ['categorias'],
    queryFn: getCategorias
  })

  useEffect(() => {
    console.log(data)
    if (data) {
      setCategories(data)
    }
  }, [data, setCategories])

  return (
    <Dialog maxWidth={'lg'} open={stateDialogCategory}>
      <DialogTitle className='!tw-py-1 !tw-px-2 !tw-font-open-sans !tw-text-[1.1rem] tw-flex tw-justify-between'>
        Categorias
        <Button
          onClick={() => setStateDialogNewCategory(true)}
          disableElevation
          variant='contained'
          size='small'
          className='!tw-capitalize'>
          Nueva Categoria
        </Button>
      </DialogTitle>
      <DialogContent className='!tw-p-0 tw-flex tw-flex-col'>
        <TableContainer component={Paper}>
          <Table size='small' sx={{ minWidth: 460 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Categorías</TableCell>
                <TableCell align='center'>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((cat) => (
                <TableRow key={cat.id} hover>
                  <TableCell>{cat.id}</TableCell>
                  <TableCell>{cat.nombre}</TableCell>
                  <TableCell align='center'>
                    <ButtonGroup variant='contained' size='small' disableElevation>
                      <Button onClick={() => setStateDialogNewCategory(true, cat)} className='!tw-capitalize'>
                        Editar
                      </Button>
                      <Button onClick={() => setStateDialogDeleteCategory(true, cat)} className='!tw-capitalize'>
                        Borrar
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions className='!tw-flex !tw-justify-between tw-col-span-full'>
        <Button
          onClick={() => setStateDialogCategory(false)}
          startIcon={<RiCloseCircleFill />}
          className='!tw-capitalize'
          disableElevation
          variant='outlined'>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
