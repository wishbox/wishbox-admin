import React, {useEffect} from 'react'
import { useSnackbar as useNotistack } from 'notistack'
import { errorMessage } from '../util'
import { useLocale } from './locale'

export function useError(error) {
  const { enqueueSnackbar } = useNotistack()
  const { t } = useLocale()

  // display snack if sending form error
  useEffect(() => {
    if (!error) return

    if (process.env.NODE_ENV === 'development') console.error(error)

    enqueueSnackbar(t(errorMessage(error)), {variant: 'error'})
  }, [error])
}

export function useSnackbar(msg) {
  const { enqueueSnackbar } = useNotistack()
  return enqueueSnackbar
}
