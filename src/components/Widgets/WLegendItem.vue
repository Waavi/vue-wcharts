<template>
    <a
        class="WLegendItem"
        :title="text"
        :class="{ active }"
        :style="styles"
        @click.prevent="$emit('onClick', { text, index })"
        @mouseenter="$emit('onMouseenter', { text, index })"
        @mouseleave="$emit('onMouseleave', { text, index })"
    >
        <slot
            name="bullet"
            :index="index"
            :text="text"
            :color="colorCmp"
        >
            <WBullet
                :borderColor="colorCmp"
                color="white"
            />
        </slot>
        <slot :text="text">
            <span class="Text">{{ text }}</span>
        </slot>
    </a>
</template>

<script>
import VueTypes from 'vue-types'
import themeMixin from '../../mixins/theme'
import WBullet from './WBullet.vue'

export default {
    name: 'WLegendItem',
    components: {
        WBullet,
    },
    mixins: [themeMixin],
    props: {
        index: VueTypes.oneOfType([Number, String]),
        text: VueTypes.string,
        active: VueTypes.bool.def(false),
        styles: VueTypes.object,
        textStyles: VueTypes.object,
        color: VueTypes.string,
    },
    computed: {
        // Get color value. Color prop, Color theme by index or color by defualt
        colorCmp () {
            if (this.color) return this.color
            if (this.index) return this.colors[this.index]
            return this.colors[0]
        },
    },
}
</script>

<style scoped lang="scss">
.WLegendItem {
    display: flex;
    align-items: center;
    font-size: 12px;
    opacity: .5;
    transition: opacity .3s ease;
    cursor: pointer;

    &.active {
        opacity: 1;
    }
}
</style>
