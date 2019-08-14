<template>
    <a
        :title="text"
        :style="stylesCmp"
        v-on="legentItemListeners"
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
import merge from 'lodash.merge'
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
        disabledStyles: VueTypes.object,
        bulletStyles: VueTypes.object,
    },
    computed: {
        // Event Listeners
        legentItemListeners () {
            return merge({}, this.$listeners, {
                click: (event) => {
                    const { text, index } = this
                    this.$emit('onClick', { text, index })
                },
                mouseenter: (event) => {
                    const { text, index } = this
                    this.$emit('onMouseenter', { text, index })
                },
                mouseleave: () => {
                    const { text, index } = this
                    this.$emit('onMouseleave', { text, index })
                },
            })
        },
        // Styles
        stylesCmp () {
            return {
                transition: this.transition,
                ...this.themeStyles.styles,
                ...this.styles,
                ...(this.active ? {} : { ...this.themeStyles.disabledStyles, ...this.disabledStyles }),
                ...(this.trigger === 'click' ? { cursor: 'pointer' } : {}),
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
