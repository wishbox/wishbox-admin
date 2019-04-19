import React, { useState, useEffect, Suspense } from 'react'
import logo from './logo.svg';
import './App.css';
import { nbsp, capfirst } from './util'
import DisconnectDialog from './components/disconnect-dialog'
import theme from './theme'
import { useAuth } from './api'
import { useLocale, useHistory } from './hooks'
import loadable from '@loadable/component'

// const ForgotPasswordPage = loadable(() => import('./pages/forgot-password'))
// const ResetPasswordPage = loadable(() => import('./pages/reset-password'))
// const ResetPasswordConfirmationPage = loadable(() => import('./pages/reset-password-confirmation'))
// const EmailConfirmationPage = loadable(() => import('./pages/reset-password-confirmation'))
// const SignInPage = loadable(() => import('./pages/sign-in'))
const DashboardPage = loadable(() => import('./pages/dashboard'))


const Page = props => {
  switch (props.path) {
    // case '/password/forgot':
    //   return <ForgotPasswordPage {...props}/>
    // case '/password/reset':
    //   return <ResetPasswordPage {...props} />
    // case '/password/confirmation':
    //   return <ResetPasswordConfirmationPage {...props} />
    // case '/email-confirmed':
    //   return <EmailConfirmationPage {...props} />
    case '/dashboard':
    default:
      return <DashboardPage {...props} />
    // case '/sign-in':
    //   return <SignInPage {...props} />
  }
}


export default function App (props) {
  let { t, lang, setLang } = useLocale()
  let history = useHistory()

  return (
    <Page path="/dashboar"/>
  );
}
