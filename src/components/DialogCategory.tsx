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
  }, [data])

  return (
    <Dialog maxWidth={'lg'} open={stateDialogCategory}>
      <DialogTitle className='!py-1 !px-2 !font-open-sans !text-[1.1rem] flex justify-between'>
        Categorias
        <Button
          onClick={() => setStateDialogNewCategory(true)}
          disableElevation
          variant='contained'
          size='small'
          className='!capitalize'>
          Nueva Categoria
        </Button>
      </DialogTitle>
      <DialogContent className='!p-0 flex flex-col'>
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
                      <Button onClick={() => setStateDialogNewCategory(true, cat)} className='!capitalize'>
                        Editar
                      </Button>
                      <Button onClick={() => setStateDialogDeleteCategory(true, cat)} className='!capitalize'>
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
      <DialogActions className='!flex !justify-between col-span-full'>
        <Button
          onClick={() => setStateDialogCategory(false)}
          startIcon={<RiCloseCircleFill />}
          className='!capitalize'
          disableElevation
          variant='outlined'>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
