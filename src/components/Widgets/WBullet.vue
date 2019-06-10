<template functional>
    <span
        class="WBullet"
        :style="{
            display: props.display,
            width: `${props.width}px`,
            height: `${props.height}px`,
            background: props.color,
            borderRadius: `${props.borderRadius}%`,
            border: `${props.borderWidth}px ${props.borderColor} ${props.borderType}`,
            margin: Array.isArray(props.margin) ? props.margin.map(m => `${m}px`).join(' ') : `${props.margin}px`,
        }"
    />
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'WBullet',
    props: {
        color: VueTypes.string.isRequired,
        display: VueTypes.string.def('inline-block'),
        width: VueTypes.oneOfType([String, Number]).def(8),
        height: VueTypes.oneOfType([String, Number]).def(8),
        borderRadius: VueTypes.oneOfType([String, Number]).def(50),
        borderWidth: VueTypes.number.def(2),
        borderColor: VueTypes.string.def('white'),
        borderType: VueTypes.string.def('solid'),
        margin: VueTypes.oneOfType([VueTypes.number, VueTypes.arrayOf(VueTypes.number).def([0, 0, 0, 0])]).def([0, 8, 0, 0]),
    },
}
</script>
