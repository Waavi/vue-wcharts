<template>
    <g v-if="active">
        <WSpread
            axis="x"
            :transition="transition"
        >
            <path
                :d="linePath"
                :style="{ transition }"
                v-bind="stylesCmp"
                fill="none"
                v-on="lineListeners"
            />
            <defs
                v-if="area && stylesCmp.fill === ''"
            >
                <linearGradient :id="`areaGradient${_uid}`">
                    <stop
                        :stop-color="stylesCmp.stroke"
                        stop-opacity="0.5"
                    />
                </linearGradient>
            </defs>
            <path
                v-if="area"
                :d="areaPath"
                :fill="stylesCmp.fill || `url(#areaGradient${_uid})`"
                :style="{ transition }"
                v-on="lineListeners"
            />
        </WSpread>
        <g
            v-if="dot"
        >
            <template
                v-for="(dotItem, id) in dotsData"
            >
                <slot
                    name="dot"
                    :dot="dotItem"
                    :first="id === 0"
                    :last="id === dotsData.length - 1"
                    :Chart="Chart"
                    :transition="transition"
                >
                    <WDot
                        :key="`dot${dotItem.cartesianIndex}${dotItem.index}`"
                        v-bind="dotItem"
                        :transition="`all 250ms ${transEffect}`"
                        :trigger="trigger"
                        @onClick="$emit('onClickDot', $event)"
                    />
                </slot>
            </template>
        </g>
    </g>
</template>

<script>
import VueTypes from 'vue-types'
import d3Line from 'd3-shape/src/line'
import d3Area from 'd3-shape/src/area'
import cardinal from 'd3-shape/src/curve/cardinal'
import merge from '../../utils/merge'
import { WDot } from '../Common'
import animationMixin from '../../mixins/animation'
import themeMixin from '../../mixins/theme'
import visibleMixin from '../../mixins/visible'
import { WSpread } from '../../transitions'
import { isFunc, noNilInArray } from '../../utils/checks'

export default {
    name: 'WLine',
    type: 'cartesian',
    components: {
        WDot,
        WSpread,
    },
    mixins: [
        themeMixin,
        animationMixin,
        visibleMixin,
    ],
    inject: ['Chart'],
    props: {
        index: VueTypes.number.isRequired, // internal props set by the parent (WCartesian)
        datakey: VueTypes.string.isRequired,
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('click'),
        legend: VueTypes.string,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        area: VueTypes.oneOfType([VueTypes.bool, VueTypes.string]).def(false),
        styles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            strokeDasharray: VueTypes.string,
        }).loose.def({}),
        dot: VueTypes.bool.def(false),
        dotStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            radius: VueTypes.number,
            hoverRadius: VueTypes.number,
        }).def({}),
        continued: VueTypes.bool.def(false),
    },
    // It's called by parent components to necessary calcs before be rendering
    // Componen is not mounted and cannot access to default props
    preload ({ parent, props, index }) {
        const { snap } = parent
        const { datakey } = props

        // Set datakeys by index
        snap.linesByIndex = { ...snap.linesByIndex, [index]: { datakey } }
    },
    computed: {
        active () {
            return this.Chart.activeElements.includes(this.index)
        },
        lineData () {
            return this.Chart.data
                .map((item, index) => item[this.datakey])
                .map((y, x) => (y ? [this.Chart.xScale(x), this.Chart.yScale(y)] : [null]))
        },
        dotsData () {
            if (!this.dot) return []
            const { data, axis } = this.Chart

            return data.reduce((acc, item, index) => {
                const [x, y] = this.lineData[index] || []
                if (y === undefined) return acc

                const info = {
                    id: this.index,
                    data: item,
                    point: index,
                    label: item[axis.x.datakey],
                    value: [{
                        value: item[this.datakey],
                        color: this.fillColor,
                    }],
                }

                return [
                    ...acc,
                    {
                        index,
                        cartesianIndex: this.index,
                        value: item[this.datakey],
                        x,
                        y,
                        info,
                        ...this.dotStylesCmp,
                    },
                ]
            }, [])
        },
        linePath () {
            const draw = d3Line().defined(noNilInArray)
            const data = this.continued ? this.lineData.filter(noNilInArray) : this.lineData

            if (this.curve) {
                draw.curve(isFunc(this.curve) ? this.curve : cardinal)
            }

            return draw(data)
        },
        areaPath () {
            if (!this.area) return null
            const draw = d3Area().defined(noNilInArray).y0(this.y0Area)
            const data = this.continued ? this.lineData.filter(noNilInArray) : this.lineData

            if (this.curve) {
                draw.curve(isFunc(this.curve) ? this.curve : cardinal)
            }

            return draw(data)
        },
        // Event Listeners
        lineListeners () {
            return merge({}, this.$listeners, {
                click: (event) => {
                    this.$emit('onClick', event)
                },
                mouseenter: (event) => {
                    this.$emit('onMouseenter', event)
                },
                mouseleave: () => {
                    this.$emit('onMouseleave')
                },
            })
        },
        // Styles
        stylesCmp () {
            const stroke = ((this.themeStyles || {}).styles || {}).stroke || this.styles.stroke || this.fillColor
            return {
                ...this.themeStyles.styles,
                ...this.styles,
                stroke,
            }
        },
        dotStylesCmp () {
            const styles = { ...this.themeStyles.dot, ...this.dotStyles }
            return {
                ...styles,
                stroke: styles.stroke || this.fillColor,
                fill: styles.fill || this.fillColor,
            }
        },
        fillColor () {
            return (this.colors || [])[this.index] || this.Chart.colors[this.index]
        },
    },
    methods: {
        y0Area (d, index) {
            if (typeof this.area !== 'string') return this.Chart.canvas.y1
            return this.Chart.data.map(item => this.Chart.yScale(item[this.area] || 0))[index]
        },
    },
}
</script>
