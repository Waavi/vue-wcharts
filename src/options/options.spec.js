import {
    theme, colors, setTheme, setOptions, setColors,
} from '.'

describe('Options/colors', () => {
    const newColors = ['#fff', '#000']

    it('Set theme colors via setColors correctly', () => {
        setColors(newColors)
        expect(colors).toEqual(newColors)
    })
    it('Set theme colors via setOptions correctly', () => {
        setOptions({ colors: newColors })
        expect(colors).toEqual(newColors)
    })
})
describe('Options/theme', () => {
    const newTheme = {
        WLine: {
            styles: {
                fill: '#fff',
                stroke: '#000',
                strokeWidth: 4,
                strokeDasharray: 1,
            },
        },
    }

    it('Set theme via setTheme correctly', () => {
        setTheme(newTheme)
        expect(theme).toMatchSnapshot()
    })
    it('Set theme theme via setOptions correctly', () => {
        setOptions({ theme: newTheme })
        expect(theme).toMatchSnapshot()
    })
})
