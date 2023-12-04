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

export const actualizarCategoria = async ({ slug, nombre }: Partial<ICategoria>): Promise<ICategoria> => {
  console.log('actualizarCategoria')
  console.log(slug)
  const response = await fetch(`/api/categorias/${slug}`, {
    method: 'PATCH',
    body: JSON.stringify({ nombre: nombre }),
    headers: { 'Content-type': 'application/json' }
  })
  return await response.json()
}

export const eliminarCategoria = async ({ id }: Partial<ICategoria>): Promise<ICategoria> => {
  console.log('eliminarCategoria')
  // console.log(slug)
  const response = await fetch(`/api/categorias/${id}`, {
    method: 'DELETE'
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
