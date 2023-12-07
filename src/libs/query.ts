import { QueryClient } from '@tanstack/react-query'
import { ICategoria, IProducto } from '../interfaces'

// const apiUrl = import.meta.env.VITE_API_URL

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1
    }
  }
})

export const getCategorias = async (): Promise<ICategoria[]> => {
  const response = await fetch(`/api/categorias`)
  return await response.json()
}

export const getCategoria = async (slug: string): Promise<ICategoria> => {
  const response = await fetch(`/api/categorias/${slug}`)
  return await response.json()
}

export const agregarCategoria = async ({ nombre }: Partial<ICategoria>): Promise<ICategoria> => {
  console.log('getProducts')
  const response = await fetch(`/api/categorias`, {
    method: 'POST',
    body: JSON.stringify({ nombre }),
    headers: { 'Content-type': 'application/json' }
  })
  return await response.json()
}

export const actualizarCategoria = async ({ id, nombre }: Partial<ICategoria>): Promise<ICategoria> => {
  console.log('actualizarCategoria')
  console.log({ id, nombre })
  const response = await fetch(`/api/categorias`, {
    method: 'PUT',
    body: JSON.stringify({ id, nombre }),
    headers: { 'Content-type': 'application/json' }
  })

  return await response.json()
}

export const eliminarCategoria = async ({ id }: Partial<ICategoria>): Promise<ICategoria> => {
  console.log('eliminarCategoria')
  // console.log(slug)
  const response = await fetch(`/api/categorias`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: { 'Content-type': 'application/json' }
  })

  return await response.json()
}

export const getProductos = async (): Promise<IProducto[]> => {
  console.log('getProducts')
  const response = await fetch(`/api/productos`)
  console.log(response)
  return await response.json()
}

export const agregarProducto = async ({
  nombre,
  precio,
  descripcion,
  imagen,
  imagenBase64,
  categoria_id
}: Partial<IProducto>): Promise<IProducto> => {
  console.log('agregarProducto')
  const response = await fetch(`/api/productos`, {
    method: 'POST',
    body: JSON.stringify({ nombre, precio, descripcion, imagen, imagenBase64, categoria_id }),
    headers: { 'Content-type': 'application/json' }
  })
  return await response.json()
}

export const editarProducto = async ({
  id,
  nombre,
  precio,
  descripcion,
  imagen,
  imagenBase64,
  categoria_id
}: Partial<IProducto>): Promise<IProducto> => {
  // console.log({
  //   id,
  //   nombre,
  //   precio,
  //   descripcion,
  //   imagen,
  //   imagenBase64,
  //   categoria_id
  // })
  const response = await fetch(`/api/productos`, {
    method: 'PUT',
    body: JSON.stringify({ id, nombre, precio, descripcion, imagen, imagenBase64, categoria_id }),
    headers: { 'Content-type': 'application/json' }
  })

  console.log(response)

  return await response.json()
  // return { msg: 'true' }
}

export const eliminarProducto = async ({ id }: Partial<IProducto>): Promise<IProducto> => {
  console.log('eliminarProducto')
  // console.log(slug)
  const response = await fetch(`/api/productos`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: { 'Content-type': 'application/json' }
  })

  return await response.json()
}
