<template>
    <a
        :title="text"
        :style="stylesCmp"
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
            <WBullet :styles="{ ...bulletStylesCmp, borderColor: bulletColor }" />
        </slot>
        <slot :text="text">
            <span>{{ text }}</span>
        </slot>
    </a>
</template>

<script>
import VueTypes from 'vue-types'
import themeMixin from '../../../mixins/theme'
import animationMixin from '../../../mixins/animation'
import WBullet from '../WBullet/WBullet.vue'

export default {
    name: 'WLegendItem',
    components: {
        WBullet,
    },
    mixins: [themeMixin, animationMixin],
    props: {
        index: VueTypes.oneOfType([Number, String]),
        text: VueTypes.string,
        active: VueTypes.bool.def(false),
        color: VueTypes.string,
        styles: VueTypes.object,
        noActiveStyles: VueTypes.object,
        bulletStyles: VueTypes.object,
    },
    computed: {
        stylesCmp () {
            return {
                transition: this.transition,
                ...this.themeStyles.styles,
                ...this.styles,
                ...(this.active ? {} : { ...this.noActiveStyles, ...this.themeStyles.noActive }),
            }
        },
        bulletStylesCmp () {
            return {
                ...this.themeStyles.bulletStyles,
                ...this.bulletStyles,
            }
        },
        // Get color value. Color prop, Color theme by index or color by default
        bulletColor () {
            if (this.color) return this.color
            if (this.index) return this.colors[this.index]
            return this.colors[0]
        },
    },
}
</script>
