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
  cantidad: number
  categoria_id: number
  categoria: ICategoria
}
