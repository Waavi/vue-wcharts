<template>
    <a
        class="WLegendItem"
        :title="text"
        :style="legendItemStylesCmp"
        @click.prevent="$emit('onClick', { text, index })"
        @mouseenter="$emit('onMouseenter', { text, index })"
        @mouseleave="$emit('onMouseleave', { text, index })"
        v-on="$listeners"
    >
        <slot
            name="bullet"
            :index="index"
            :text="text"
            :color="bulletColor"
        >
            <WBullet :styles="{ borderColor: bulletColor, ...bulletStylesCmp }" />
        </slot>
        <slot :text="text">
            <span class="Text">{{ text }}</span>
        </slot>
    </a>
</template>

<script>
import VueTypes from 'vue-types'
import themeMixin from '../../../mixins/theme'
import WBullet from '../WBullet/WBullet.vue'

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
        color: VueTypes.string,
        styles: VueTypes.object.def({}),
        bulletStyles: VueTypes.object.def({}),
    },
    computed: {
        legendItemStylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
                ...(this.active ? { opacity: '1' } : { }),
            }
        },
        bulletStylesCmp () {
            return {
                ...this.themeStyles.bulletStyles,
                ...this.bulletStyles,
            }
        },
        // Get color value. Color prop, Color theme by index or color by defualt
        bulletColor () {
            if (this.color) return this.color
            if (this.index) return this.colors[this.index]
            return this.colors[0]
        },
    },
}
</script>
