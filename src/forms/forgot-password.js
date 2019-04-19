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
      required: true
    },
    {
      type: 'submit',
      label: 'Send email'
    }
  ],

  id: "reset-password-form",
  className: "reset-password-form",
  autoComplete: 'on',
  method: 'POST',
  action: "/authentication/mpos/login"
}
