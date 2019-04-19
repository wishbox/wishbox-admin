import React, {useEffect} from 'react'
import { useSnackbar } from 'notistack'
import { errorMessage } from '../util'
import { useLocale } from './locale'

export function useError(error) {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useLocale()

  // display snack if sending form error
  useEffect(() => {
    if (!error) return

    if (process.env.NODE_ENV === 'development') console.error(error)

    enqueueSnackbar(t(errorMessage(error)), {variant: 'error'})
  }, [error])
}

export function useSuccess(msg) {
  const { enqueueSnackbar } = useSnackbar()

  // display snack if sending form error
  useEffect(() => {
    if (msg) enqueueSnackbar(msg, {variant: 'success'})
  }, [msg])
}
