/* eslint-disable import/no-mutable-exports */
import merge from '../utils/merge'
import c from '../utils/colors'
import Theme from './theme'

/*
*   Colors Palette
*/
export let colors = [
    c.primary,
    c.lightUrple,
    c.paleGold,
    c.veryLightPink,
    c.brightCyan,
    c.purplishBlue,
    c.pink,
]

export let theme = {
    ...Theme,
}

/*
*   Setters
*/
export const setColors = (newColors) => {
    colors = [...newColors]
}

export const setTheme = (newTheme = {}) => {
    theme = merge({}, theme, newTheme)
}

/*
*   Options
*/
export const setOptions = (opts = {}) => {
    if (opts.colors) setColors(opts.colors)
    if (opts.theme) setTheme(opts.theme)
}

export default {
    setOptions,
}
