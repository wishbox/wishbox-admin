export default {
  fields: {
    currentEmail: {
      type: 'email',
      id: "currentEmail",
      label: 'Current email',
      autoComplete: "username email",
      required: true
    },
    newEmail: {
      type: 'email',
      id: "newEmail",
      label: 'Email',
      autoComplete: "username email",
      required: true,
      validate: (value, values) => {
        if (!value.trim()) return 'Email cannot be blank'
        if (values.newEmail === values.currentEmail) return 'New email cannot be the same as the old one'
      }
    },
    confirmEmail: {
      type: "email",
      id: "confirmEmail",
      autoComplete: "username email",
      label: 'Confirm new email',
      required: true,
      validate: (value, values) => {
        if (values.newEmail !== values.confirmEmail) return 'Email does not match'
      }
    },
    submit: {
      type: "submit",
      label: 'Save'
    }
  },

  id: "change-email-form",
  className: "change-email-form",
  autoComplete: 'on',
  method: 'POST',
  action: "/authentication/mpos/login"
}
