'use client'
import { actualizarCategoria, agregarCategoria, queryClient } from '@/libs/query'
import { Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiCloseCircleFill } from 'react-icons/ri'
import { TbSquareRoundedCheckFilled } from 'react-icons/tb'
import { ICategoria } from '../interfaces'
import useStore from '../store/useStore'

interface IForm {
  nameCategory: string
}

export default function FormCategory() {
  const [disabled, setDisabled] = useState(false)
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
    setDisabled(true)

    if (objCategory.id) {
      updateCategory(
        { id: objCategory.id, nombre: nameCategory },
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
  }, [objCategory, reset])

  return (
    <form className='tw-flex tw-flex-col' onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className='!tw-py-2 !tw-px-1.5 tw-flex tw-flex-col'>
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
      <DialogActions className='!tw-flex !tw-justify-between tw-col-span-full'>
        <Button
          onClick={() => setStateDialogNewCategory(false)}
          startIcon={<RiCloseCircleFill />}
          className='!tw-capitalize'
          disableElevation
          variant='outlined'>
          Cancelar
        </Button>
        <Button
          type='submit'
          startIcon={<TbSquareRoundedCheckFilled />}
          className='!tw-capitalize'
          disableElevation
          disabled={disabled}
          variant='contained'>
          Aceptar
        </Button>
      </DialogActions>
    </form>
  )
}
