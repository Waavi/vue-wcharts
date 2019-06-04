<template functional>
    <span
        class="WBullet"
        :style="{
            display: props.display,
            width: `${props.width}px`,
            height: `${props.height}px`,
            background: props.color,
            borderRadius: `${props.borderRadius}%`,
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
        width: VueTypes.oneOfType([String, Number]).def(10),
        height: VueTypes.oneOfType([String, Number]).def(10),
        borderRadius: VueTypes.oneOfType([String, Number]).def(50),
        margin: VueTypes.oneOfType([VueTypes.number, VueTypes.arrayOf(VueTypes.number).def([0, 0, 0, 0])]).def(8),
    },
}
</script>
