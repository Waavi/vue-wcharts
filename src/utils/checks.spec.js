import {
    isBoolean,
    isFunc,
    isNumber,
    isString,
    isObj,
    isArray,
} from './checks'

describe('Utils/checks', () => {
    it('isBoolean works correctly', () => {
        expect(isBoolean(true)).toBeTruthy()
        expect(isBoolean(() => null)).toBeFalsy()
        expect(isBoolean(2)).toBeFalsy()
        expect(isBoolean('Test')).toBeFalsy()
        expect(isBoolean({})).toBeFalsy()
        expect(isBoolean([])).toBeFalsy()
    })

    it('isFunc works correctly', () => {
        expect(isFunc(true)).toBeFalsy()
        expect(isFunc(() => null)).toBeTruthy()
        expect(isFunc(2)).toBeFalsy()
        expect(isFunc('Test')).toBeFalsy()
        expect(isFunc({})).toBeFalsy()
        expect(isFunc([])).toBeFalsy()
    })

    it('isNumber works correctly', () => {
        expect(isNumber(true)).toBeFalsy()
        expect(isNumber(() => null)).toBeFalsy()
        expect(isNumber(2)).toBeTruthy()
        expect(isNumber('Test')).toBeFalsy()
        expect(isNumber({})).toBeFalsy()
        expect(isNumber([])).toBeFalsy()
    })

    it('isString works correctly', () => {
        expect(isString(true)).toBeFalsy()
        expect(isString(() => null)).toBeFalsy()
        expect(isString(2)).toBeFalsy()
        expect(isString('Test')).toBeTruthy()
        expect(isString({})).toBeFalsy()
        expect(isString([])).toBeFalsy()
    })

    it('isObj works correctly', () => {
        expect(isObj(true)).toBeFalsy()
        expect(isObj(() => null)).toBeFalsy()
        expect(isObj(2)).toBeFalsy()
        expect(isObj('Test')).toBeFalsy()
        expect(isObj({})).toBeTruthy()
        expect(isObj([])).toBeFalsy()
    })

    it('isArray works correctly', () => {
        expect(isArray(true)).toBeFalsy()
        expect(isArray(() => null)).toBeFalsy()
        expect(isArray(2)).toBeFalsy()
        expect(isArray('Test')).toBeFalsy()
        expect(isArray({})).toBeFalsy()
        expect(isArray([])).toBeTruthy()
    })
})
