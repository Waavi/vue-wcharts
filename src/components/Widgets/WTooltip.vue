<template>
    <div
        v-if="selected"
        ref="tooltip"
        class="WTooltip"
        :class="{ visible }"
        :style="{ top: y, left: x }"
    >
        <slot v-bind="selected">
            <div class="Wrapper">
                <span class="Title">{{ selected.xAxisVal }}</span>
                <div class="Value">
                    <slot
                        name="bullet"
                        v-bind="selected"
                    >
                        <div
                            class="Bullet"
                            :style="bulletStyle"
                        />
                    </slot>
                    <span>{{ selected.yAxisVal }}</span>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import { toPx } from './utils'

export default {
    name: 'WTooltip',
    type: 'plugins',
    inject: ['Cartesian'],
    props: {
        id: VueTypes.string,
        gap: VueTypes.number.def(10),
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
        // Bullet style
        bulletStyle () {
            if (!this.selected) return {}

            return {
                background: this.selected.color,
            }
        },
    },
    watch: {
        'Cartesian.active': function watchActive ({ el, event, type }) {
            // Reset tooltip if not has selected
            if (!el) {
                this.reset()
                return
            }

            // Generate selected Point
            if (type === this.Cartesian.active.types.point) this.selected = this.getPointSelected(el)

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
        // Get point values
        getPointSelected ({ id, point }) {
            // Get line of point
            const line = this.Cartesian.dataset[point]
            // Get data name of point
            const field = this.Cartesian.datakeys[id]
            // Get color of cartesian dataset
            const color = this.Cartesian.colors[id]
            // Get values
            const xAxisVal = line.name
            const yAxisVal = line[field]

            return {
                xAxisVal,
                yAxisVal,
                color,
            }
        },
        // Set pos tooltip
        calcPos (event) {
            const { layerX, layerY } = event
            const { viewWidth, height: viewHeight } = this.Cartesian
            // Add space between point of tooltip
            let x = layerX + this.gap
            let y = layerY + this.gap
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

<style scoped lang="scss">
.WTooltip {
    position: absolute;
    display: flex;
    padding: .5rem;
    border-radius: 4px;
    color: #FFF;
    background: #333;
    font-size: 14px;
    opacity: 0;
    transition: opacity .15s ease;

    &.visible {
        opacity: 1;
    }
}

.Wrapper {
    display: flex;
    flex-direction: column;
}

.Title {
    margin-bottom: 5px;
}

.Bullet {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: .5rem;
}
</style>
