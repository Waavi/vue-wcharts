import colors from '../utils/colors'

const bulletStyles = {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    background: 'white',
    borderRadius: '50%',
    borderWidth: '2px',
    borderColor: 'white',
    borderStyle: 'solid',
    margin: '0px 8px 0px 0px',
}

const legendStyles = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    cursor: 'pointer',
}

const axisStyles = {
    line: {
        stroke: colors.grayMedium,
    },
    tick: {
        stroke: colors.grayMedium,
    },
    tickLabel: {
        stroke: 'none',
        fill: colors.grayDark,
        fontSize: 12,
    },
    label: {
        fill: colors.grayDark,
        fontWeight: 800,
    },
    grid: {},
}

export default {
    WChart: {
        viewBox: {
            fill: 'white',
        },
        canvas: {
            fill: '#fbfbfb',
        },
    },
    WLine: ({ color: { main = '#555', secondary } = {}, hoverRadius = 8 }) => ({
        line: {
            fill: 'none',
            stroke: main,
            strokeWidth: 2,
            strokeDasharray: '0',
            // https://css-tricks.com/presentation-attributes-vs-inline-styles/
            // => ¿Y si esto devuelve los attrs para el componente svg concreto y themeStyle hace además un merge con este styles y el suyo?
            // styles: {

            // },
        },
        dot: {
            fill: main,
            stroke: '',
            strokeWidth: 2,
            radius: 4,
            hoverRadius,
        },
    }),
    WBar: ({ color: { main = '#555', secondary } = {}, hoverRadius = 8 }) => ({
        rect: {
            fill: main,
        },
    }),
    WScatter: ({ color: { main = '#555', secondary } = {}, hoverRadius = 8 }) => ({
        point: {
            fill: main,
            stroke: main,
            strokeWidth: 0,
            r: 8,
        },
    }),
    PieSector: ({ color: { main = '#555', secondary } = {}, hoverRadius = 8 }) => ({
        sector: {
            fill: main,
        },
    }),
    WPie: {
        styles: {
            position: 'relative',
            transform: 'translate(50%, 50%)',
        },
        path: {
            stroke: colors.white,
        },
    },
    WXAxis: { ...axisStyles },
    WYAxis: { ...axisStyles },
    WZAxis: { ...axisStyles },
    WCartesianGrid: {
        styles: {
            stroke: colors.grayMedium,
            strokeWidth: 1,
            strokeDasharray: '3',
        },
    },
    WMarker: {
        styles: {
            stroke: colors.grayDarker,
            strokeWidth: 1,
            strokeDasharray: '0',
            r: 10,
            fill: 'none',
        },
        label: {
            fill: colors.grayDarker,
            fontSize: 14,
        },
    },
    WLegend: {
        styles: {
            position: 'absolute',
            display: 'flex',
        },
        wrapperStyles: {
            display: 'flex',
            flex: '1',
            margin: '0',
            listStyle: 'none',
        },
        bulletStyles,
        legendStyles,
        legendStylesDisabled: {
            opacity: '0.5',
            cursor: 'default',
        },
    },
    WLegendItem: {
        styles: { ...legendStyles },
        disabledStyles: {
            opacity: '0.5',
            cursor: 'default',
        },
        bulletStyles,
    },
    WTooltip: {
        styles: {
            position: 'absolute',
            display: 'flex',
            padding: '.5rem',
            borderRadius: '4px',
            color: colors.black,
            background: 'white',
            boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.15)',
            fontSize: '14px',
            opacity: 0,
            zIndex: 1,
            transition: 'opacity .25s ease',
        },
        visible: {
            opacity: 1,
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
        },
        title: {
            marginBottom: '5px',
        },
    },
    WBullet: {
        styles: { ...bulletStyles },
    },
    WDot: {
        strokeWidth: 2,
        radius: 4,
        hoverRadius: 8,
        styles: {
            cursor: 'default',
        },
    },
    WAxisText: {
        styles: {
            fill: 'none',
            stroke: 'none',
            fontSize: 14,
        },
    },
    WSimpleHStackBar: {
        styles: {
            height: '20px',
        },
        label: {
            position: 'absolute',
            top: '50%',
            left: '5px',
            transform: 'translateY(-50%)',
            color: colors.white,
        },
        marker: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '10px',
            height: '10px',
            background: colors.white,
        },
    },
}

export const COLORS = {
    red: { main: '#f88', secondary: '#fbb' },
    green: { main: '#8f8', secondary: '#bfb' },
    blue: { main: '#88f', secondary: '#bbf' },
    yellow: { main: '#ff8', secondary: '#ffb' },
}
export const PALETTE = [
    { key: 'red', ...COLORS.red },
    { key: 'green', ...COLORS.green },
    { key: 'blue', ...COLORS.blue },
    { key: 'yellow', ...COLORS.yellow },
    { main: '#f8f', secondary: '#fbf' },
    { main: '#8ff', secondary: '#bff' },
]

export function colorNormalizer (color) {
    if (typeof color === 'string') {
        return { key: color, main: color, secondary: color }
    }
    if (color && color.main) {
        return {
            ...color,
            key: color.key || color.main,
            secondary: color.secondary || color.main,
        }
    }
    return { key: 'unknown', main: '#333', secondary: '#555' }
}
