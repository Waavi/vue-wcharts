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
            fill: colors.grayDarker,
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
        },
        label: {
            fill: colors.grayDarker,
            fontSize: 14,
        },
    },
    WPie: {
        styles: {
            position: 'relative',
            transform: 'translate(50%, 50%)',
        },
        path: {
            stroke: colors.white,
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
        noActive: { opacity: '0.5' },
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
    WTickText: {
        styles: {
            fill: 'none',
            stroke: 'none',
            fontSize: 14,
        },
    },
}
