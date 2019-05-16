// eslint-disable-next-line
export let colors = [
    '#3fb1e3',
    '#6be6c1',
    '#626c91',
    '#a0a7e6',
    '#c4ebad',
    '#96dee8',
    '#013566',
    '##ff4f81',
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
