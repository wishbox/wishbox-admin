export default {
  fields: {
    newPassword: {
      type: 'password',
      id: "newPassword",
      label: 'Password',
      autoComplete: "password",
      required: true,
      validate: (value, values) => {
        if (!value.trim()) return 'Password cannot be blank'
        if (values.newPassword === values.currentPassword) return 'New password cannot be the same as the old one'
      }
    },
    confirmPassword: {
      type: "password",
      id: "confirmPassword",
      autoComplete: "password",
      label: 'Confirm new password',
      required: true,
      validate: (value, values) => {
        if (values.newPassword !== values.confirmPassword) return 'Password does not match'
      }
    },
    submit: {
      type: 'submit',
      label: 'Reset password'
    }
  },

  id: "reset-password-form",
  className: "reset-password-form",
  autoComplete: 'on',
  method: 'POST',
  action: "/management/mpos/users/portal/passwords/reset"
}
