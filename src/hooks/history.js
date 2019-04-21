import { useEffect, useState } from 'react'
import delegate from 'delegate-it'
import { createBrowserHistory } from 'history'


let history = createBrowserHistory()
let unlisten, delegation
let count = 0

// global-ish history tracker
export function useHistory() {
  let [, push] = useState(() => {
    if (count++) return history

    unlisten = history.listen((location, action) => {
      push({})
    })

    delegation = delegate('a', 'click', e => {
      e.preventDefault()
      history.push(e.delegateTarget.getAttribute('href'))
    })

    return history
  })

  useEffect(() => () => {
    if (!--count) {
      unlisten()
      delegation.destroy()
    }
  }, [])

  return history
}
