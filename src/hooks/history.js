import { createBrowserHistory } from 'history'
import delegate from 'delegate-it'
import create from 'zustand'


// global-ish history tracker
export const [ useHistory ] = create(set => {
  let history = createBrowserHistory()

  const unlisten = history.listen((location, action) => {
    set({path: location.pathname})
  })

  let delegation = delegate('a', 'click', e => {
    e.preventDefault()
    set({path: e.delegateTarget.getAttribute('href')})
  });

  function destroy () {
    console.warning('History should not be destroyed normally')
    unlisten()
    delegation.destroy()
  }

  return history
})
