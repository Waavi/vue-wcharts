<template>
    <text>
        <slot />
    </text>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'Label',
    props: {
        x: VueTypes.number.isRequired,
        y: VueTypes.number.isRequired,
        width: VueTypes.number.optional,
        height: VueTypes.number.optional,
        position: VueTypes.oneOf([
            'center',
            'left',
            'insideLeft',
            'insideRight',
            'right',
            'top',
            'insideTop',
            'insideBottom',
            'bottom',
            'insideTopLeft',
            'insideTopRight',
            'insideBottomLeft',
            'insideBottomRight',
        ]).def('center'),
        positionIfNotFit: VueTypes.oneOf([
            'hide',
            'left',
            'right',
            'top',
            'bottom',
        ]).optional,
        appearAnimation: VueTypes.oneOf([
            'fade',
            'fromDown',
            'fromUp',
            'fromLeft',
            'fromRight',
        ]).optional,
        appearFromStyle: VueTypes.object.optional,
        styles: VueTypes.object.def({}),
    },
}
</script>
