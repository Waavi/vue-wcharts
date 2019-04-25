<template>
    <div
        v-if="selected"
        class="WTooltip"
        :style="{ top: y, left: x }"
    >
        <slot v-bind="selected">
            <div class="Wrapper">
                <span class="Title">{{ selected.xAxisVal }}</span>
                <div class="Value">
                    <div
                        class="Bullet"
                        :style="bulletStyle"
                    />
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
            if (!el) {
                // Clean selected
                this.selected = null
                return
            }

            // Calc tooltip pos
            this.calcPos(event)
            // Generate selected Point
            if (type === this.Cartesian.active.types.point) this.selected = this.getPointSelected(el)
        },
    },
    methods: {
        // Get point values
        getPointSelected ({ id, point }) {
            const line = this.Cartesian.dataset[point]
            const field = this.Cartesian.datakeys[id]
            const color = this.Cartesian.colors[id]
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
            const { layerX: x, layerY: y } = event
            this.x = toPx(x + this.gap)
            this.y = toPx(y + this.gap)
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
