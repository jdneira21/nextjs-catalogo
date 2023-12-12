'use client'
import { agregarProducto, editarProducto, queryClient } from '@/libs/query'
import { Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import 'react-cropper-custom/dist/index.css'
import { Controller, useForm } from 'react-hook-form'
import { BiUpload } from 'react-icons/bi'
import { RiCloseCircleFill } from 'react-icons/ri'
import { TbSquareRoundedCheckFilled } from 'react-icons/tb'
import ReactSelect from 'react-select'
import { IProducto } from '../interfaces'
import useStore from '../store/useStore'
import { CloudinaryUploadWidget } from 'react-cloudinary-uploader'


const pictureUploaderOptions = {
  clientAllowedFormats: ['jpg', 'jpeg', 'png'], // allowed file formats
  resourceType: 'image', // resource type, either 'image' or 'video'
  cropping: false, // cropping is enabled
  croppingAspectRatio: 1, // square aspect ratio
  croppingShowDimensions: true, // show cropping dimensions
  croppingValidateDimensions: true, // validate image dimensions after cropping
  maxFileSize: 10000000, // max file size in bytes (10 MB)
  folder: 'images', // Cloudinary folder to upload to
  sources: ['local'] // upload sources, either 'local', 'url', 'camera' or 'google_drive'
}

interface IForm extends IProducto { }

export default function FormProduct() {
  const [disabled, setDisabled] = useState(false)
  const [img, setImg] = useState('')
  const setStateDialogProduct = useStore((state) => state.setStateDialogProduct)
  const objProduct = useStore((store) => store.objProduct)
  const categories = useStore((state) => state.categories)

  const { mutateAsync: addProduct } = useMutation({
    mutationKey: ['agregarProducto'],
    mutationFn: agregarProducto
  })

  const { mutateAsync: updateProduct } = useMutation({
    mutationKey: ['editarProducto'],
    mutationFn: editarProducto
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
    const { nombre, precio, descripcion, categoria } = data

    if (objProduct.id) {
      setDisabled(true)
      updateProduct(
        {
          id: objProduct.id,
          nombre,
          precio,
          descripcion,
          imagen: objProduct.imagen,
          categoria_id: categoria.id
        },
        {
          onSuccess: (data) => {
            console.log(data)
            setStateDialogProduct(false)
            queryClient.prefetchQuery({ queryKey: ['productos'] })
            reset(data)
          },
          onError: (data) => {
            console.log(data)
          }
        }
      )
      return
    }

    if (!img.length) return

    setDisabled(true)
    // const { nombre, precio, descripcion, categoria } = data

    addProduct(
      { nombre, precio, descripcion, imagen: img, categoria_id: categoria.id },
      {
        onSuccess: () => {
          setStateDialogProduct(false)
          queryClient.prefetchQuery({ queryKey: ['productos'] })
          reset(data)
        }
      }
    )
  }





  const cancel = () => {
    setStateDialogProduct(false)
    setImg('')
  }

  const handleUploadSuccess = (info: any) => {
    console.log('Upload success:', info)
    setImg(info.secure_url)
  }

  const handleUploadFailure = (error: any) => {
    console.error('Upload error:', error)
  }

  useEffect(() => {
    if (objProduct) {
      console.log(objProduct)
      reset(objProduct)
    }
  }, [objProduct, reset])

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


        {/* <CloudinaryUploadWidget
          cloudName='dlltfgm4b'
          uploadPreset='yp5ecxto'
          buttonStyle={{ border: '1px solid black', padding: '10px' }}
          buttonClass='custom-class' // className for button element
          buttonText='Choose Image'
          onUploadSuccess={handleUploadSuccess}
          onUploadFailure={handleUploadFailure}
          options={pictureUploaderOptions}
        /> */}



        {/* <CloudinaryUploadWidget
      cloudName="your-cloud-name"
      uploadPreset="your-upload-preset"
      options={pictureUploaderOptions}
      onUploadSuccess={handleUploadSuccess}
      onUploadFailure={handleUploadFailure}
    > */}
        {/* <button
          style={{
            color: 'white',
            border: 'none',
            width: '120px',
            backgroundColor: '#bbb',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          className='custom-class'>
          Upload Picture
        </button> */}
        {/* </CloudinaryUploadWidget> */}


        {/* {img} */}

        <div className='tw-col-span-2'>

          {img
            ? <img src={img} width='230' height='130' />
            : null
          }

          <div className='tw-flex tw-items-center tw-justify-center'>



            <CloudinaryUploadWidget
              cloudName='dlltfgm4b'
              uploadPreset='yp5ecxto'
              options={pictureUploaderOptions}
              onUploadSuccess={handleUploadSuccess}
              onUploadFailure={handleUploadFailure}>
              <Button type='button' size='small'
                startIcon={<BiUpload />}
                className='!capitalize'
                color='secondary'
                variant='contained'
                disableElevation>
                Subir Imagen
              </Button>
            </CloudinaryUploadWidget>
          </div>
        </div>

        {/* <div className='tw-col-span-2'>
          {objProduct.id && !img.length ? (
            <Image alt='dasdsa' width='230' height='130' src={`${objProduct.imagen}`} />
          ) : (
            <Cropper src={img} zoom={zoom} aspect={400 / 700} onZoomChange={setZoom} onCropComplete={onCropComplete} />
          )}

          <div className='tw-flex tw-items-center tw-justify-center'>
            <label className='tw-flex tw-items-center tw-gap-2 tw-py-1 tw-px-2 tw-place-items-center tw-bg-gray-800 tw-text-white tw-hover:bg-gray-900 tw-shadow-lg tw-rounded-md tw-cursor-pointer'>
              <BiUpload />
              <span className='tw-text-[0.8rem]'>Subir Imagen</span>
              <input onChange={(e) => onChange(e)} type='file' className='tw-hidden' />
            </label>
          </div>
        </div> */}


      </DialogContent>
      <DialogActions className='!tw-flex !tw-justify-between tw-col-span-full'>
        <Button
          onClick={cancel}
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
          disabled={disabled}
          variant='contained'>
          Aceptar
        </Button>
      </DialogActions>
    </form>
  )
}
