// eslint-disable-next-line
export let colors = [
    '#48c0b6',
    '#5400e8',
    '#414141',
    '#dfbd46',
    '#cccccc',
    '#54ddd9',
    '#9d6af5',
    '#ffde69',
    '#e8e8e8',
    '#348c85',
    '#a712b5',
    '#b58d12',
    '#000000',
    '#87cac4',
    '#6e19ff',
    '#ebd13b',
    '#f9f9f9',
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
