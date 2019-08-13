<template>
    <div
        v-if="!!Chart.legends.length"
        class="WLegend"
        :style="stylesCmp.component"
    >
        <ul
            class="Wrapper"
            :style="stylesCmp.wrapper"
        >
            <li
                v-for="(legend, index) in Chart.legends"
                :key="legend"
                class="Legend"
                :style="stylesCmp.legend"
            >
                <WLegendItem
                    :key="index"
                    :index="index"
                    :text="legend"
                    :active="!selectable ? false : Chart.activeElements.includes(index)"
                    :style="legendStylesCmp"
                    :disabledStyles="legendStylesDisabledCmp"
                    :colors="colors"
                    @onClick="handleClick"
                >
                    <template #bullet="{ index, text, color }">
                        <slot
                            name="bullet"
                            :index="index"
                            :text="text"
                            :color="color"
                        >
                            <WBullet :styles="{ ...bulletStylesCmp, borderColor: color }" />
                        </slot>
                    </template>
                </WLegendItem>
            </li>
        </ul>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import sortBy from 'lodash.sortby'
import { toPx, getIsHorizontal, getSpacesByPos } from '../utils'
import WLegendItem from '../WLegendItem/WLegendItem.vue'
import WBullet from '../WBullet/WBullet.vue'
import themeMixin from '../../../mixins/theme'

export default {
    name: 'WLegend',
    type: 'plugins',
    inject: ['Chart'],
    components: {
        WLegendItem,
        WBullet,
    },
    mixins: [themeMixin],
    props: {
        position: VueTypes.oneOf(['top', 'bottom', 'left', 'right']).def('bottom'),
        align: VueTypes.oneOf(['start', 'center', 'end']).def('center'),
        space: VueTypes.arrayOf(VueTypes.number).def([16, 16, 16, 16]),
        size: VueTypes.number, // Width or height, with different positiion prop top-bottom/left-right
        selectable: VueTypes.bool.def(false),
        colors: VueTypes.arrayOf(VueTypes.string),
        // Styles
        styles: VueTypes.object.def({}),
        wrapperStyles: VueTypes.object.def({}),
        legendStyles: VueTypes.object.def({}),
        legendStylesDisabled: VueTypes.object.def({}),
        bulletStyles: VueTypes.object.def({}),
    },
    preload ({ parent, props, index }) {
        const { position, size, space } = props
        // Positions
        const isHorizontal = getIsHorizontal(position)
        const innerWidth = !isHorizontal ? size || 85 : null
        const innerHeight = isHorizontal ? size || 20 : null
        // Spaces
        const [top, right, bottom, left] = space || this.props.space.default()
        const width = right + left + innerWidth
        const height = top + bottom + innerHeight
        // Resize parent
        const spaces = getSpacesByPos(position, { width, height }, parent.spaceObjects)
        parent.addSpace(spaces)
    },
    computed: {
        stylesCmp () {
            const { position, align, size } = this
            const isHorizontal = getIsHorizontal(position)
            // Positions
            const width = isHorizontal ? '100%' : size || toPx(85)
            const height = !isHorizontal ? '100%' : size || toPx(20)
            // Spaces
            const [topParent, rightParent, bottomParent, leftParent] = this.Chart.space
            const [top, right, bottom, left] = this.space
            const spaces = {
                top, bottom, left, right,
            }
            // Styles
            const justifyContent = align !== 'center' ? `flex-${align}` : align
            const aligns = {
                vertical: { flexDirection: 'column', padding: [toPx(topParent), 0, toPx(bottomParent), 0].join(' ') },
                horizontal: { flexDirection: 'row', padding: [0, toPx(rightParent), 0, toPx(leftParent)].join(' ') },
            }

            return {
                component: {
                    top: !isHorizontal ? 0 : null,
                    [position]: toPx(spaces[position]),
                    width,
                    height,
                    ...this.themeStyles.styles,
                    ...this.styles,
                },
                wrapper: {
                    ...aligns[isHorizontal ? 'horizontal' : 'vertical'],
                    justifyContent,
                    ...this.themeStyles.wrapperStyles,
                    ...this.wrapperStyles,
                },
                legend: {
                    margin: !isHorizontal ? '.5rem 0 0 0' : '0 0 0 .75rem',
                },
            }
        },
        legendStylesCmp () {
            return {
                ...this.themeStyles.legendStyles,
                ...this.legendStyles,
            }
        },
        legendStylesDisabledCmp () {
            return {
                ...this.themeStyles.legendStylesDisabled,
                ...this.legendStylesDisabled,
            }
        },
        bulletStylesCmp () {
            return {
                ...this.themeStyles.bulletStyles,
                ...this.bulletStyles,
            }
        },
    },
    methods: {
        /*
        *  Handle on click legend, if has selectable prop true
        */
        handleClick ({ legend, index }) {
            if (!this.selectable) return
            let actives = [...this.Chart.activeElements]

            if (!actives.includes(index)) actives.push(index)
            else actives = actives.filter(n => n !== index)

            this.Chart.activeElements = sortBy(actives)
        },
    },
}
</script>
