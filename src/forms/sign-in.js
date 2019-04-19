export default {
  fields: [
    {
      type: 'text',
      id: "merchantAccountNumber",
      label: 'Merchant ID',
      autoComplete: "username",
      required: true
    },
    {
      type: 'email',
      id: "email",
      label: 'Email',
      autoComplete: "username email",
      required: true
    },
    {
      type: "password",
      id: "password",
      autoComplete: "current-password",
      label: 'Password',
      required: true
    },
    {
      type: "submit",
      label: 'Sign In'
    }
  ],

  id: "sign-in-form",
  className: "sign-in-form",
  autoComplete: 'on',
  method: 'POST',
  action: "/authentication/mpos/login"
}
