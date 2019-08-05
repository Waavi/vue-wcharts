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
    opacity: '.5',
    cursor: 'pointer',
}

const axisStyles = {
    styles: {
        stroke: colors.grayMedium,
    },
    mark: {
        stroke: colors.grayMedium,
    },
    label: {
        fill: colors.grayDark,
        fontWeight: 800,
    },
    tick: {
        stroke: 'none',
        fill: colors.grayDark,
        fontSize: 12,
    },
}

export default {
    WLine: {
        styles: {
            fill: '',
            stroke: '',
            strokeWidth: 2,
            strokeDasharray: '0',
        },
        dot: {
            fill: 'white',
            stroke: '',
            strokeWidth: 2,
            radius: 4,
            hoverRadius: 8,
        },
    },
    WBar: {
        styles: {},
        label: {
            fill: '#333',
            cursor: 'default',
        },
    },
    WScatter: {
        line: {
            fill: '',
            stroke: '',
            strokeWidth: 1,
            strokeDasharray: '0',
        },
        dot: {
            fill: '',
            stroke: '',
            strokeWidth: 0,
            radius: 8,
            opacity: 0.8,
        },
    },
    WXAxis: { ...axisStyles },
    WYAxis: { ...axisStyles },
    WZAxis: { ...axisStyles },
    WCartesianGrid: {
        styles: {
            stroke: '#ccc',
            strokeWidth: 1,
            strokeDasharray: '3',
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
    },
    WLegendItem: {
        styles: { ...legendStyles },
        bulletStyles,
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
    WTickText: {
        styles: {
            fill: 'none',
            stroke: 'none',
            fontSize: 14,
        },
    },
}
