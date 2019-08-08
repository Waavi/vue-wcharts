export const isBoolean = val => typeof val === 'boolean'

export const isFunc = val => typeof val === 'function'

export const isNumber = val => typeof val === 'number'

export const isString = val => typeof val === 'string'

export const isObj = val => typeof val === 'object' && !Array.isArray(val)

export const isArray = val => Array.isArray(val)

export default {
    isBoolean,
    isFunc,
    isNumber,
    isString,
    isObj,
    isArray,
}
