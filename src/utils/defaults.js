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

export default {
    themeStyles: {
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
        },
        WLegendItem: {
            styles: {
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                opacity: '.5',
                transition: 'opacity .3s ease',
                cursor: 'pointer',
            },
            bulletStyles,
        },
        WBullet: {
            styles: { ...bulletStyles },
        },
    },
}
