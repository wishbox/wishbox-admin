import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logoPng from '../assets/wishbox-logo.png'
import { useLocale, useAsyncCall, useError } from '../hooks'

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

function SignIn() {
  const classes = useStyles()
  const { t } = useLocale()
  const formRef = useRef()
  const action = process.env.REACT_APP_API_URL + 'owner-login'

  const [success, error, loading, submit] = useAsyncCall(async (formData) => {
    let response = await fetch(action, {
      method: 'post',
      body: formData
    })
    if (!response.ok) throw Error(response.statusText)

    // TODO: make backend return real status with real body, including error messages
    if (response.redirected) throw Error(t`Bad credentials.`)

    let data = await response.text()

    return data
  }, [])
  useError(error)

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar} src={logoPng} style={{width: 160, height: 160, overflow: 'visible'}}/>
      <Typography component="h1" variant="h4" color="textPrimary">
        {`WishBox`}
      </Typography>
      <form className={classes.form} ref={formRef} noValidate id="loginform" method="post" action={action} onSubmit={e => {
        e.preventDefault()
        submit(new FormData(formRef.current))
      }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="txtemail"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="txtupass"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Grid container alignItems="center">
          <Grid item xs>
            <Box textAlign="left">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} mb={2} >
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            {t`Sign In`}
          </Button>
        </Box>
      </form>
      <Box mt={1}>
        <Typography align="center">
          <Link href="#" variant="body1">
            {t`Forgot password?`}
          </Link>
        </Typography>
      </Box>
    </div>
  );
}

export default SignIn;
