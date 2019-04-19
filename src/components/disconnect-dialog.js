import React, { useEffect, useCallback } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCountdown, usePrevious } from '../hooks'

const EVENTS = 'mousemove mouseup mousedown wheel touchstart touchmove scroll resize focus keydown keypress keyup'.split(' ')

export default props => {
  // auth guard
  const [count, reset] = useCountdown(props.startAt, 1000)
  const prev = usePrevious(count)

  const on = useCallback(() => EVENTS.forEach(eventName => window.removeEventListener(eventName, reset)), [reset])
  const off = useCallback(() => EVENTS.forEach(eventName => window.removeEventListener(eventName, reset)), [reset])

  useEffect(() => {
    on()

    return off
  }, [off, on])

  return (
  <Dialog
    open={count < props.showAt && prev > 0}
    onClose={reset}
    onBackdropClick={reset}
    onEscapeKeyDown={reset}
    onEnter={() => off()}
    onExit={() => on()}
    onExited={() => prev <= 0 && props.onExpire()}
    aria-labelledby="disconnect-title"
    aria-describedby="disconnect-description"
    maxWidth='sm'
  >
    <DialogTitle id="disconnect-title">{props.title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="disconnect-description">
        {props.text.call ? props.text(prev) : props.text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={reset} color="primary" autoFocus>
        {props.actionText}
      </Button>
    </DialogActions>
  </Dialog>
)}
