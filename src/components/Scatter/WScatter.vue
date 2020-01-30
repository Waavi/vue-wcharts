<template>
    <g v-if="active">
        <WSpread
            v-if="line"
            axis="x"
            :transition="transition"
        >
            <path
                :d="linePath"
                :style="{ transition: `all 250ms ${transEffect}` }"
                v-bind="lineStylesCmp"
            />
        </WSpread>
        <g>
            <template v-for="dotItem in dotsData">
                <slot
                    name="dot"
                    :dot="dotItem"
                    :Chart="Chart"
                    :transition="transition"
                >
                    <WDot
                        :key="`dot${dotItem.cartesianIndex}${dotItem.index}`"
                        v-bind="dotItem"
                        :styles="{ opacity: dotStylesCmp.opacity }"
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
import sortBy from 'lodash.sortby'
import d3Line from 'd3-shape/src/line'
import cardinal from 'd3-shape/src/curve/cardinal'
import { WDot } from '../Common'
import animationMixin from '../../mixins/animation'
import themeMixin from '../../mixins/theme'
import visibleMixin from '../../mixins/visible'
import { WSpread } from '../../transitions'
import { isFunc, isNumber, noNilInArray } from '../../utils/checks'

export default {
    name: 'WScatter',
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
        index: VueTypes.number,
        datakey: VueTypes.string,
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        legend: VueTypes.string,
        curve: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
        line: VueTypes.bool.def(false),
        continued: VueTypes.bool.def(false),
        lineStyles: VueTypes.shape({
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            strokeDasharray: VueTypes.string,
        }).loose.def({}),
        dotStyles: VueTypes.shape({
            fill: VueTypes.string,
            stroke: VueTypes.string,
            strokeWidth: VueTypes.number,
            radius: VueTypes.number,
            opacity: VueTypes.number,
        }).loose.def({}),
    },
    computed: {
        active () {
            return this.Chart.activeElements.includes(this.index)
        },
        points () {
            // Check if has a multiple scatter
            return this.datakey ? this.Chart.data.filter(item => item.$dataset === this.datakey) : (this.Chart.data || [])
        },
        lineData () {
            const {
                axis, xScale, yScale, zScale,
            } = this.Chart
            const { x, y, z } = axis
            const data = this.continued ? sortBy(this.points, x.datakey) : this.points
            return data.map(item => (isNumber(item[x.datakey]) && isNumber(item[y.datakey]) ? [xScale(item[x.datakey]), yScale(item[y.datakey]), zScale(item[z.datakey])] : [null]))
        },
        dotsData () {
            const { axis } = this.Chart

            return this.points.reduce((acc, item, index) => {
                const [x, y, z = this.dotStylesCmp.radius] = this.lineData[index] || []
                if (y === undefined) return acc
                const coords = { x, y, z }
                const value = Object.keys(axis).map(key => this.generateAxisValue(axis[key], item[axis[key].datakey])).filter(Boolean)
                const info = {
                    $dataset: item.$dataset,
                    id: index,
                    data: item,
                    label: item.name || '',
                    value,
                }

                return [
                    ...acc, {
                        index,
                        cartesianIndex: this.index,
                        value: item[axis.y.datakey],
                        info,
                        ...coords,
                        ...this.dotStylesCmp,
                        radius: z,
                        hoverRadius: z,
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
        lineStylesCmp () {
            return {
                ...this.themeStyles.line,
                ...this.lineStyles,
                stroke: this.themeStyles.line.stroke || this.lineStyles.stroke || this.fillColor,
                fill: 'none',
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
        generateAxisValue ({ name, datakey }, data, color) {
            return data && ({
                key: name,
                value: data,
                color: color || this.fillColor,
            })
        },
    },
}
</script>
