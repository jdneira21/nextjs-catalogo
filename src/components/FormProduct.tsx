'use client'
import { agregarProducto, queryClient } from '@/libs/query'
import { Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { Cropper, getCroppedImg } from 'react-cropper-custom'
import 'react-cropper-custom/dist/index.css'
import { Controller, useForm } from 'react-hook-form'
import { BiUpload } from 'react-icons/bi'
import { RiCloseCircleFill } from 'react-icons/ri'
import { TbSquareRoundedCheckFilled } from 'react-icons/tb'
import ReactSelect from 'react-select'
import { IProducto } from '../interfaces'
import useStore from '../store/useStore'

interface IForm extends IProducto {}

type Area = {
  width: number
  height: number
  x: number
  y: number
}

export default function FormProduct() {
  const [img, setImg] = useState('')
  const [zoom, setZoom] = useState(1)
  const setStateDialogProduct = useStore((state) => state.setStateDialogProduct)
  const categories = useStore((state) => state.categories)

  const setImageCrop = useStore((state) => state.setImageCrop)
  const imageCrop = useStore((state) => state.imageCrop)
  const resetImageCrop = useStore((state) => state.resetImageCrop)

  const { mutateAsync: addProduct } = useMutation({
    mutationKey: ['agregarProducto'],
    mutationFn: agregarProducto
  })

  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
    reset,
    resetField
  } = useForm<IForm>({ mode: 'onSubmit' })

  const onSubmit = (data: IForm) => {
    console.log(imageCrop)

    if (!imageCrop.length) return

    const { nombre, precio, descripcion, categoria } = data

    addProduct(
      { nombre, precio, descripcion, imagen: '', imagenBase64: imageCrop, categoria_id: categoria.id },
      {
        onSuccess: () => {
          setStateDialogProduct(false)
          queryClient.prefetchQuery({ queryKey: ['productos'] })
          reset(data)
        }
      }
    )
  }

  const onCropComplete = async (croppedArea: Area) => {
    console.log('onCropComplete')
    try {
      const image = await getCroppedImg(img, croppedArea, { width: 700, height: 400 * 1 })
      // setCroppedImg(image)
      setImageCrop(image)
      // console.log(image)
    } catch (e) {
      // console.error(e)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onChange')
    if (e.target.files === null) return
    setImg(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <form className='tw-flex tw-flex-col' onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className='!tw-py-2 !tw-px-1.5 tw-grid tw-grid-cols-5 tw-gap-2 tw-h-full'>
        <div className='tw-col-span-3 tw-flex tw-flex-col tw-gap-2'>
          <TextField
            {...register('nombre', { required: 'Producto' })}
            autoFocus
            size='small'
            label='Producto'
            error={!(errors.nombre == null)}
            helperText={errors.nombre?.message}
            inputProps={{ autoComplete: 'hidden' }}
          />
          <TextField
            {...register('precio', { required: 'Precio' })}
            size='small'
            label='Precio'
            error={!(errors.precio == null)}
            helperText={errors.precio?.message}
            inputProps={{ autoComplete: 'hidden' }}
          />
          <TextField
            {...register('descripcion', { required: 'Descripcion' })}
            size='small'
            label='Descripción'
            error={!(errors.descripcion == null)}
            helperText={errors.descripcion?.message}
            inputProps={{ autoComplete: 'hidden' }}
          />
          <Controller
            control={control}
            name='categoria'
            rules={{ required: true }}
            render={({ field }) => (
              <ReactSelect
                {...field}
                getOptionLabel={(option) => option.nombre}
                getOptionValue={(option) => option.nombre}
                menuPosition='fixed'
                placeholder='Categoría'
                options={categories.map((cat) => ({ ...cat, label: cat.nombre }))}
              />
            )}
          />
        </div>
        <div className='tw-col-span-2'>
          <Cropper src={img} zoom={zoom} aspect={1} onZoomChange={setZoom} onCropComplete={onCropComplete} />

          <div className='tw-flex tw-items-center tw-justify-center'>
            <label className='tw-flex tw-items-center tw-gap-2 tw-py-1 tw-px-2 tw-place-items-center tw-bg-gray-800 tw-text-white tw-hover:bg-gray-900 tw-shadow-lg tw-rounded-md tw-cursor-pointer'>
              <BiUpload />
              <span className='tw-text-[0.8rem]'>Subir Imagen</span>
              <input onChange={(e) => onChange(e)} type='file' className='tw-hidden' />
            </label>
          </div>
        </div>
      </DialogContent>
      <DialogActions className='!tw-flex !tw-justify-between tw-col-span-full'>
        <Button
          onClick={() => setStateDialogProduct(false)}
          startIcon={<RiCloseCircleFill />}
          className='!capitalize'
          disableElevation
          variant='outlined'>
          Cancelar
        </Button>
        <Button
          type='submit'
          startIcon={<TbSquareRoundedCheckFilled />}
          className='!capitalize'
          disableElevation
          variant='contained'>
          Aceptar
        </Button>
      </DialogActions>
    </form>
  )
}
