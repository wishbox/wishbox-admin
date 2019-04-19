
export const styleProps = new Set([
  'border',
  'borderBottom',
  'borderColor',
  'borderLeft',
  'borderRadius',
  'borderRight',
  'borderTop',
  'boxShadow',
  'displayPrint',
  'display',
  'alignContent',
  'alignItems',
  'alignSelf',
  'flex',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'justifyContent',
  'order',
  'bgcolor',
  'color',
  'bottom',
  'left',
  'position',
  'right',
  'top',
  'zIndex',
  'height',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'width',
  'm',
  'mb',
  'ml',
  'mr',
  'mt',
  'mx',
  'my',
  'p',
  'pb',
  'pl',
  'pr',
  'pt',
  'px',
  'py',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'textAlign',
  // NOTE: this omits react reserved props as well
  'key',
  'ref'
])

export const pick = (obj, props) => {
  let result = {}
  if (typeof props === 'string') props = props.split(/\n*\s+\n*\s*/)
  let propsSet = props instanceof Set ? props : new Set(props)
  for (let prop in obj) {
    if (propsSet.has(prop)) result[prop] = obj[prop]
  }
  return result
}

export const pickStyle = (obj) => {
  return pick(obj, styleProps)
}

export const omitStyle = (obj) => omit(obj, styleProps)

export const omit = (obj, props) => {
  let result = {}
  if (typeof props === 'string') props = props.split(/\n*\s+\n*\s*/)
  let propsSet = new Set(props)
  for (let prop in obj) {
    if (!propsSet.has(prop)) result[prop] = obj[prop]
  }
  return result
}

export function styleForm (form, styles) {
  if (Array.isArray(form.fields)) throw Error('Array fields arent supported for now')

  let clonedForm = Object.assign(form)

  clonedForm.fields = Object.assign(styles, clonedForm.fields)

  return clonedForm
}

export function nbsp (str) {
  return str.replace(/&nbsp;/g, '\xa0').replace(/\s/g, '\xa0')
}

export function capfirst (str) {
  return str[0].toUpperCase() + str.slice(1)
}

export function isEmpty(obj) {
  if (!obj) return true
  if (obj.length !== undefined && !obj.length) return true

  for (var name in obj) return false

  return true
}

export function clean (obj) {
  if (!obj) return obj

  let result = {}
  for (let p in obj) {
    if (obj[p] == null) continue
    if (obj[p] === '') continue
    if (obj[p].length != null && !obj[p].length) continue
    result[p] = obj[p]
  }

  return result
}


export function errorMessage (e) {
  if (typeof e === 'string') return e;

  if (e.response && e.response.data && e.response.data.error) {
    return e.response.data.error.errorMessage || ('Error code ' + e.response.data.error.code)
  }

  if (e.message) return e.message

  return e
}
