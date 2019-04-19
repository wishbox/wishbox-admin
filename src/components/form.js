import React, { useContext, useState } from 'react'
import { useFormState } from 'react-use-form-state'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AttachMoney from '@material-ui/icons/AttachMoney';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { pickStyle, omitStyle, isEmpty } from '../util';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

export const FormContext = React.createContext();

export function Form ({
  fields=[],
  // initialvalues
  init={},
  onSubmit,
  onError,
  loading=false,
  children,
  autoFocus,
  margin='normal',
  text,
  header,
  options,
  t=(v)=>v,
  ...formProps
}) {
  fields = normalizeFields(fields)

  // populate init object
  fields.forEach(field => {
    if (!(field.id in init)) {
      // take over field.init property
      if ('init' in field ) init[field.id] = field.init
    }
  })

  const [form, validator] = useFormState(init);

  if (fields.length && autoFocus===undefined) autoFocus = fields[0].id

  return (
    <FormContext.Provider value={{form, validator, t, autoFocus}}>
      <form {...omitStyle(formProps)} onSubmit={e => onSubmit(e, form.values)}>
        <Fields fields={fields} loading={loading} autoFocus={autoFocus} margin={margin}/>
        { children }
      </form>
    </FormContext.Provider>
  )
}

export function Fields({fields, loading, autoFocus, margin='normal'}) {
  fields = normalizeFields(fields)

  if (fields.length && autoFocus===undefined) autoFocus = useContext(FormContext).autoFocus
  if (fields.length && autoFocus===undefined) autoFocus = fields[0].id

  return fields.map((field, i) => (
    <Field margin={margin} mt={isButton(field)  ? 3 : 0} {...field} key={getKey(field)} loading={loading} autoFocus={autoFocus === field.id}/>
  ))
}

export function Field (props) {
  if (props.type === 'multiselect') return <MultiselectField {...props} />

  let {loading=false, validate=()=>{}, children, ...field} = props
  let {form, validator, t} = useContext(FormContext)
  let key = getKey(field)
  let {validity, errors, touched} = form
  let [showPassword, setShowPassword] = useState(false)

  let validatorProps = {...(validator[field.type || 'text'] || validator.text)({
    name: field.id,
    validate: validate
  })}
  if (showPassword) validatorProps.type = 'text'


  return (
    isButton(field) ?
    <Box key={key} {...pickStyle(field)}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={loading || (field.type === 'submit' && !isFormValid(form))}
        {...omitStyle(field)}
      >
        {t(field.label)}
      </Button>
    </Box>
    :
    <Box clone key={key} {...pickStyle(field)}>
      <TextField
        InputProps={{
          endAdornment:
            field.type === 'password' &&
            field.adornment !== false &&
            field.endAdornment !== false &&
            <InputAdornment position="end">
              <IconButton edge='start' aria-label="Toggle password visibility" onClick={e => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>,
          startAdornment:
            field.id === 'price' &&
            <InputAdornment position="start">
              <IconButton disabled edge='start' aria-label="Price icon">
                {<AttachMoney />}
              </IconButton>
            </InputAdornment>,
        }}
        name={field.id}
        select={field.type === 'select'}
        error={validity[field.id] === false}
        helperText={t(errors[field.id])}
        variant="standard"
        disabled={loading}
        {...omitStyle(field)}
        label={t(field.label)}
        {...validatorProps }
      >
        {children}
      </TextField>
    </Box>
  )
}


export function MultiselectField(props) {
  let {loading=false, validate=()=>{}, children, ...field} = props
  let {form, validator, t} = useContext(FormContext)
  let key = getKey(field)
  let {validity, errors, touched} = form

  let validatorProps = {...validator.selectMultiple({
    name: field.id,
    validate: validate
  })}

  if (!validatorProps.value) validatorProps.value = []

  let values = new Set(validatorProps.value)

  let options = field.options || []

  return <Box clone key={key} {...pickStyle(field)} mt={2} mb={1}>
    <FormControl
      margin="normal"
      name={field.id}
      variant="standard"
      disabled={loading}>
      <InputLabel htmlFor="select-multiple">{ t(field.label) }</InputLabel>
      <Select
        {...validatorProps}
        onChange={(e) => {
          // fix for use-form-state validator
          let values = new Set(e.target.value)
          e.target.options = options.map(o => {
            o.selected = values.has(o.value)
            return o
          })
          validatorProps.onChange(e)
        }}
        renderValue={selected => {
          return selected.filter(id => {
            let option = options.find(o => o.value === id)
            if (!option) {
              console.error('Selected option `' + id + '` doesn\'t exist in multiselect `' + field.id + '` options')
              return false
            }
            return true
          }).map(id => {
            let option = options.find(o => o.value === id)
            return option.label
          }).join(', ')
        }}
        input={<Input id="select-multiple-checkbox" />}
      >
        {options.map(({value, label}) => (
          <MenuItem key={field.id + value} value={value}>
            <Checkbox checked={values.has(value)} />
            <ListItemText primary={label}/>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
}

// get key from a field
export function getKey (field) {
  return field.key || field.id || field.name || field.label || field.type
}

// turn fields into an array
export function normalizeFields (fields) {
  // convert fields object to an array
  if (!Array.isArray(fields)) {
    let fieldsArray = []
    for (let id in fields) {
      let field = fields[id]
      if (!field) continue
      field.id = field.id || id
      fieldsArray.push(fields[id])
    }
    fields = fieldsArray
  }

  // remove empty & hidden fields
  fields = fields.filter(field => {
    if (!field || field.hidden) return false
    return true
  })

  return fields
}

export function isButton(field) {
  if (!field) return false
  return field.type === 'submit' || field.type === 'button'
}

export function isFormValid({touched, errors}) {
  return !isEmpty(touched) && isEmpty(errors)
}


export default Form

