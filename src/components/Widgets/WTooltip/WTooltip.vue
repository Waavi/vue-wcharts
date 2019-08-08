<template>
    <div
        v-if="selected"
        ref="tooltip"
        :style="{
            ...stylesCmp,
            ...(visible ? visibleStylesCmp : {}),
            top: y,
            left: x
        }"
    >
        <slot v-bind="selected">
            <div :style="wrapperStylesCmp">
                <slot
                    name="label"
                    :label="selected.label"
                >
                    <span
                        v-if="selected.label"
                        :style="titleStylesCmp"
                    >{{ selected.label }}</span>
                </slot>

                <div
                    v-for="(value, index) in selected.value"
                    :key="index"
                >
                    <slot
                        name="bullet"
                        v-bind="value"
                    >
                        <WBullet :styles="{ borderColor: value.color }" />
                    </slot>

                    <slot
                        name="value"
                        v-bind="value"
                    >
                        <span>{{ value.value }}</span>
                    </slot>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import WBullet from '../WBullet/WBullet.vue'
import { toPx } from '../utils'
import themeMixin from '../../../mixins/theme'

export default {
    name: 'WTooltip',
    type: 'plugins',
    inject: ['Chart'],
    components: {
        WBullet,
    },
    mixins: [themeMixin],
    props: {
        id: VueTypes.string,
        gap: VueTypes.number.def(10),
        styles: VueTypes.object,
        visibleStyles: VueTypes.object,
        titleStyles: VueTypes.object,
        wrapperStyles: VueTypes.object,
    },
    data () {
        return {
            selected: null,
            visible: false,
            x: 0,
            y: 0,
        }
    },
    computed: {
        // Styles
        stylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
            }
        },
        // Visible Styles
        visibleStylesCmp () {
            return {
                ...this.themeStyles.visible,
                ...this.visibleStyles,
            }
        },
        // Wrapper Styles
        wrapperStylesCmp () {
            return {
                ...this.themeStyles.wrapper,
                ...this.wrapperStyles,
            }
        },
        // Title Styles
        titleStylesCmp () {
            return {
                ...this.themeStyles.title,
                ...this.titleStyles,
            }
        },
        // Bullet style
        bulletStyle () {
            if (!this.selected) return {}

            return {
                background: this.selected.color,
            }
        },
    },
    watch: {
        'Chart.active': function watchActive ({ el, event }) {
            // Reset tooltip if not has selected
            if (!el) {
                this.reset()
                return
            }

            // Set selected
            this.selected = el

            // Calc tooltip pos after rendering html
            this.$nextTick(() => {
                this.calcPos(event)
            })
        },
    },
    methods: {
        // Show tooltip
        show () {
            this.visible = true
        },
        // Hide tooltip
        hide () {
            this.visible = false
        },
        // Reset
        reset () {
            this.hide()
            this.selected = null
        },
        // Set pos tooltip
        calcPos (event) {
            const { layerX, layerY } = event
            const { viewWidth, height: viewHeight } = this.Chart
            const { offsetLeft = 0, offsetTop = 0 } = this.selected
            // Add space between point of tooltip
            let x = layerX + this.gap + offsetLeft
            let y = layerY + this.gap + offsetTop
            // Get size of tooltip
            const { clientWidth: elWidth, clientHeight: elHeight } = this.$refs.tooltip || {}

            // Move to left, if tooltip does not fit on the right
            if (viewWidth <= x + elWidth) x = x - elWidth - this.gap
            // Move to top, if tooltip does not fit on the bottom
            if (viewHeight <= y + elHeight) y = y - elHeight - this.gap

            // Set coords
            this.x = toPx(x)
            this.y = toPx(y)
            // Show tooltip
            this.$nextTick(this.show)
        },
    },
}
</script>
