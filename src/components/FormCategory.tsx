'use client'
import { actualizarCategoria, agregarCategoria, queryClient } from '@/libs/query'
import { Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RiCloseCircleFill } from 'react-icons/ri'
import { TbSquareRoundedCheckFilled } from 'react-icons/tb'
import { ICategoria } from '../interfaces'
import useStore from '../store/useStore'

interface IForm {
  nameCategory: string
}

export default function FormCategory() {
  const setStateDialogNewCategory = useStore((store) => store.setStateDialogNewCategory)
  const objCategory = useStore((store) => store.objCategory)

  const { mutateAsync: addCategory } = useMutation({
    mutationKey: ['agregarCategoria'],
    mutationFn: agregarCategoria
  })

  const { mutateAsync: updateCategory } = useMutation({
    mutationKey: ['actualizarCategoria'],
    mutationFn: actualizarCategoria
  })

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    resetField
  } = useForm<IForm>({ mode: 'onSubmit' })

  const onSubmit = ({ nameCategory }: IForm) => {
    if (objCategory.id) {
      updateCategory(
        { slug: objCategory.slug, nombre: nameCategory },
        {
          onSuccess: () => {
            setStateDialogNewCategory(false, {} as ICategoria)
            queryClient.prefetchQuery({ queryKey: ['categorias'] })
            resetField('nameCategory')
          }
        }
      )
      return
    }

    addCategory(
      { nombre: nameCategory },
      {
        onSuccess: () => {
          setStateDialogNewCategory(false)
          queryClient.prefetchQuery({ queryKey: ['categorias'] })
          resetField('nameCategory')
        }
      }
    )
  }

  useEffect(() => {
    if (objCategory) {
      reset({ nameCategory: objCategory.nombre })
    }
  }, [objCategory])

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className='!py-2 !px-1.5 flex flex-col'>
        <TextField
          {...register('nameCategory', { required: 'Categoría' })}
          autoFocus
          size='small'
          label='Categoría'
          error={!(errors.nameCategory == null)}
          helperText={errors.nameCategory?.message}
          inputProps={{ autoComplete: 'hidden' }}
        />
      </DialogContent>
      <DialogActions className='!flex !justify-between col-span-full'>
        <Button
          onClick={() => setStateDialogNewCategory(false)}
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
