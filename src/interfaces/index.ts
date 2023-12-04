export interface ICategoria {
  id: number
  nombre: string
  slug: string
  productos: IProducto[]
}

export interface IProducto {
  id: number
  nombre: string
  precio: number
  descripcion: string
  imagen: string
  imagenBase64: string
  cantidad: number
  categoria_id: number
  categoria: ICategoria
}
