import { create } from 'zustand'
import { ICategoria, IProducto } from '../interfaces'

interface State {
  cart: IProducto[]
  stateDialogCategory: boolean
  stateDialogNewCategory: boolean
  stateDialogEditCategory: boolean
  stateDialogDeleteCategory: boolean
  stateDialogDeleteProduct: boolean
  stateDialogProduct: boolean

  stateDialogFinalProduct: boolean

  objCategory: ICategoria
  objProduct: IProducto
  objDeleteCategory: ICategoria
  objDeleteProduct: IProducto
  categories: ICategoria[]

  imageCrop: string
}

interface Action {
  addCart: (product: IProducto) => void
  getTotalProducts: () => number
  setStateDialogCategory: (bool: boolean) => void
  setStateDialogNewCategory: (bool: boolean, categoria?: ICategoria) => void
  setStateDialogDeleteCategory: (bool: boolean, categoria?: ICategoria) => void

  setStateDialogProduct: (bool: boolean, product?: IProducto) => void
  setStateDialogDeleteProduct: (bool: boolean, product?: IProducto) => void

  setStateDialogFinalProduct: (bool: boolean) => void

  setCategories: (array: ICategoria[]) => void

  setImageCrop: (dataImage: string) => void
  resetImageCrop: () => void
}

const initialState: State = {
  cart: [],
  stateDialogCategory: false,
  stateDialogNewCategory: false,
  stateDialogEditCategory: false,
  stateDialogDeleteCategory: false,
  stateDialogDeleteProduct: false,
  stateDialogProduct: false,
  stateDialogFinalProduct: false,
  objCategory: {} as ICategoria,
  objProduct: {} as IProducto,
  objDeleteCategory: {} as ICategoria,
  objDeleteProduct: {} as IProducto,
  categories: [],

  imageCrop: ''
}

export default create<State & Action>()((set, get) => ({
  ...initialState,
  addCart: (product) => {
    set((state) => {
      product = { ...product, cantidad: 1 }

      const findProductExists = state.cart.find((prod) => prod.id == product.id)

      if (product.id == findProductExists?.id) {
        const newCart = state.cart.map((prod) => {
          if (prod.id == findProductExists?.id) {
            prod.cantidad = prod.cantidad + 1
          }
          return prod
        })
        return { cart: [...newCart] }
      }

      return { cart: [product, ...state.cart] }
    })
  },
  getTotalProducts: () => get().cart.reduce((suma, prod) => suma + prod.cantidad, 0),

  setStateDialogCategory: (bool) => {
    set({ stateDialogCategory: bool })
  },
  setStateDialogNewCategory: (bool, objCategory) => {
    console.log(objCategory)
    set({ stateDialogNewCategory: bool, objCategory: objCategory ?? ({} as ICategoria) })
  },

  setStateDialogDeleteCategory: (bool, objDeleteCategory) => {
    set({ stateDialogDeleteCategory: bool, objDeleteCategory: objDeleteCategory ?? ({} as ICategoria) })
  },

  setStateDialogDeleteProduct: (bool, objDeleteProduct) => {
    set({ stateDialogDeleteProduct: bool, objDeleteProduct: objDeleteProduct ?? ({} as IProducto) })
  },

  setStateDialogProduct: (bool, objProduct) => {
    set({ stateDialogProduct: bool, objProduct: objProduct ?? ({} as IProducto) })
  },

  setStateDialogFinalProduct: (bool) => {
    set({ stateDialogFinalProduct: bool })
  },

  setCategories: (array) => {
    set({ categories: array })
  },

  setImageCrop: (dataImage) => {
    set({ imageCrop: dataImage })
  },
  resetImageCrop: () => {
    set(initialState)
  }
}))
