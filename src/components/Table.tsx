'use client'
import { getProductos } from '@/libs/query'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import { useMemo } from 'react'
import { IProducto } from '../interfaces'
import DialogDeleteCategory from './DialogDeleteCategory'
import DialogNewCategory from './DialogNewCategory'
import DialogProduct from './DialogProduct'

export default function Table() {
  const { data, isLoading } = useQuery<IProducto[]>({
    queryKey: ['productos'],
    queryFn: getProductos
  })

  console.log(data)
  console.log('productos')

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
      {
        accessorFn: (originalRow) => originalRow.descripcion,
        id: 'descripcion',
        header: 'Producto'
      },
      {
        accessorFn: (originalRow) => originalRow.categoria.nombre,
        id: 'categoria',
        header: 'Categoría'
      },
      {
        // accessorFn: (originalRow) => originalRow.categoria.nombre,
        header: 'Acciones'
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
    localization: MRT_Localization_ES
  })
  return (
    <>
      <MaterialReactTable table={table} />
      <DialogNewCategory />
      <DialogDeleteCategory />
      <DialogProduct />
    </>
  )
}
