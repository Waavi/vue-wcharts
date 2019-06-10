import c from './utils/colors'

// eslint-disable-next-line
export let colors = [
    c.primary,
    c.lightUrple,
    c.paleGold,
    c.veryLightPink,
    c.brightCyan,
    c.purplishBlue,
    c.macaroniAndCheese,
]

export const setColors = (newColors) => {
    colors = newColors
}

export const setOptions = (opts = {}) => {
    if (opts.colors) setColors(opts.colors)
}

export default {
    setOptions,
}
