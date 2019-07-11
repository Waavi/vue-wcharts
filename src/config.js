/* eslint-disable import/no-mutable-exports */
import c from './utils/colors'
import { Defaults } from './utils'

/*
*   Props
*/
export let colors = [
    c.primary,
    c.lightUrple,
    c.paleGold,
    c.veryLightPink,
    c.brightCyan,
    c.purplishBlue,
    c.macaroniAndCheese,
]

export let theme = {
    ...Defaults.themeStyles,
}

/*
*   Setters
*/
export const setColors = (newColors) => {
    colors = newColors
}

export const setTheme = (newTheme = {}) => {
    theme = {
        ...theme,
        ...newTheme,
    }
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
