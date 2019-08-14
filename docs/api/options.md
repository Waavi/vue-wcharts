---
sidebarDepth: 3
---
# Options

## Theme

### Introduction

There are a lot of options to style your charts, you can set a color palette or styling components locally or globally, the same style property you can set to your componentes individually, you can set globally. We are using component name as key in this configuration object.

### Configuration example
```js
Vue.use(WCharts, {
    // Colors Palette
    colors: [
        '#48c0b6',
        '#5400e8',
        '#a712b5',
        '#dfbd46',
    ],
    // Theme styles
    theme: {
        WLine: {
            styles: {
                strokeWidth: 4,
                strokeDasharray: 1,
            },
            dot: {
                fill: 'black',
                strokeWidth: 4,
            },
        },
        WCartesianGrid: {
            styles: {
                stroke: '#48c0b6',
                strokeWidth: 2,
                strokeDasharray: 4,
            },
        },
        ...
    }
})
```

### WLine
```js
{
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
}
```

### WBar
```js
{
    styles: {},
    label: {
        fill: '#333333',
        cursor: 'default',
    },
    stackedLabel: {
        fill: '#333333',
        cursor: 'default',
    },
}
```

### WScatter
```js
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
```

### WXAxis, WYAxis, WZAxis
```js
{
    styles: {
        stroke: '#cccccc',
    },
    mark: {
        stroke: '#cccccc',
    },
    label: {
        fill: '#414141,
        fontWeight: 800,
    },
    tick: {
        stroke: 'none',
        fill: '#414141,
        fontSize: 12,
    },
}
```

### WCartesianGrid
```js
{
    styles: {
        stroke: '#cccccc',
        strokeWidth: 1,
        strokeDasharray: '3',
    },
}
```

### WMarker
```js
{
    styles: {
        stroke: '#333333',
        strokeWidth: 1,
        strokeDasharray: '0',
    },
    label: {
        fill: '#333333',
        fontSize: 14,
    },
}
```

### WPie
```js
{
    styles: {
        position: 'relative',
        transform: 'translate(50%, 50%)',
    },
    path: {
        stroke: '#ffffff',
    },
}
```

### WLegend
```js
{
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
    bulletStyles: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        background: 'white',
        borderRadius: '50%',
        borderWidth: '2px',
        borderColor: 'white',
        borderStyle: 'solid',
        margin: '0px 8px 0px 0px',
    },
    legendStyles: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        cursor: 'pointer',
    },
    legendStylesDisabled: {
        opacity: '0.5',
    },
}
```

### WLegendItem
```js
{
    styles: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        cursor: 'pointer',
    },
    disabledStyles: { opacity: '0.5' },
    bulletStyles: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        background: 'white',
        borderRadius: '50%',
        borderWidth: '2px',
        borderColor: 'white',
        borderStyle: 'solid',
        margin: '0px 8px 0px 0px',
    },
}
```

### WTooltip
```js
{
    styles: {
        position: 'absolute',
        display: 'flex',
        padding: '.5rem',
        borderRadius: '4px',
        color: '#000000',
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
```

### WBullet
```js
{
    styles: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        background: 'white',
        borderRadius: '50%',
        borderWidth: '2px',
        borderColor: 'white',
        borderStyle: 'solid',
        margin: '0px 8px 0px 0px',
    },
}
```

### WDot
```js
{
    strokeWidth: 2,
    radius: 4,
    hoverRadius: 8,
    styles: {
        cursor: 'default',
    },
}
```

### WTickText
```js
{
    styles: {
        fill: 'none',
        stroke: 'none',
        fontSize: 14,
    },
}
```
