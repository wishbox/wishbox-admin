import { useState, useEffect } from 'react'
import create from 'zustand'

const [useStore] = create(set => ({
  title: null,
  set: (title) => set({title})
}))

export function useTitle(t) {
  let {set, title} = useStore()
  useEffect(() => {
    set(t)
  }, [t])
  return title
}
