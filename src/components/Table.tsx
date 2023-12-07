'use client'
import { getProductos } from '@/libs/query'
import { Button, ButtonGroup } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import { useMemo } from 'react'
import { IProducto } from '../interfaces'

import useStore from '../store/useStore'

export default function Table() {
  const setStateDialogProduct = useStore((state) => state.setStateDialogProduct)
  const setStateDialogDeleteProduct = useStore((state) => state.setStateDialogDeleteProduct)
  const { data, isLoading } = useQuery<IProducto[]>({
    queryKey: ['productos'],
    queryFn: getProductos
  })

  const columns = useMemo<MRT_ColumnDef<IProducto>[]>(
    () => [
      // {
      //   accessorKey: 'id',
      //   header: 'ID'
      // },
      {
        accessorFn: (originalRow) => originalRow.nombre,
        id: 'titulo',
        header: 'Producto'
      },
      {
        accessorFn: (originalRow) => originalRow.precio,
        id: 'precio',
        header: 'Precio'
      },
      // {
      //   accessorFn: (originalRow) => originalRow.descripcion,
      //   id: 'descripcion',
      //   header: 'Desc'
      // },
      {
        accessorFn: (originalRow) => originalRow.categoria.nombre,
        id: 'categoria',
        header: 'Categoría'
      },
      {
        // accessorFn: (originalRow) => originalRow.categoria.nombre,
        header: 'Acciones',
        Cell: ({ row }) => (
          <div className='flex justify-center gap-x-2 transition opacity-0 group-hover:opacity-100'>
            <ButtonGroup variant='contained' size='small' disableElevation>
              <Button onClick={() => setStateDialogProduct(true, row.original)} className='!tw-capitalize'>
                Editar
              </Button>
              <Button onClick={() => setStateDialogDeleteProduct(true, row.original)} className='!tw-capitalize'>Borrar</Button>
            </ButtonGroup>
          </div>
        )
      }
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data: data ?? [],
    enableRowSelection: false,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    state: { isLoading },
    // enable
    initialState: { density: 'compact' },
    localization: MRT_Localization_ES,
    renderRowActions: ({ row, table }) => <div>hola</div>
  })
  return (
    <>
      <MaterialReactTable table={table} />
    </>
  )
}
