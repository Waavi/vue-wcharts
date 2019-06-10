import c from './utils/colors'

// eslint-disable-next-line
export let colors = [
    c.primary,
    c.secondary,
    c.grayDark,
    c.macaroniAndCheese,
    c.grayMedium,
    c.brightCyan,
    c.lightUrple,
    c.paleGold,
    c.veryLightPink,
    c.sea,
    c.barney,
    c.darkGold,
    c.black,
    c.paleTeal,
    c.purplishBlue,
    c.macaroniAndCheeseTwo,
    c.grayLight,
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
