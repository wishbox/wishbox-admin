export default {
  fields: {
    currentPassword: {
      type: 'password',
      id: "currentPassword",
      label: 'Current password',
      autoComplete: "current password",
      required: true
    },
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
      type: "submit",
      label: 'Change password'
    }
  },

  id: "change-password-form",
  className: "change-password-form",
  autoComplete: 'on',
  method: 'POST',
  action: "/authentication/mpos/login"
}
