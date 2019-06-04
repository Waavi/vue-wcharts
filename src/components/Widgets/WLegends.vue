<template>
    <div
        v-if="!!Chart.legends.length"
        class="WLegends"
        :style="styles.component"
    >
        <ul
            class="Wrapper"
            :style="styles.wrapper"
        >
            <li
                v-for="(legend, index) in Chart.legends"
                :key="legend"
                class="Legend"
                :class="[position]"
            >
                <WLegend
                    :key="index"
                    :index="index"
                    :text="legend"
                    :active="Chart.activeElements.includes(index)"
                    :style="legendStyles"
                    @onClick="handleClick"
                >
                    <template #bullet="{ index, text, color }">
                        <slot
                            name="bullet"
                            :index="index"
                            :text="text"
                            :color="color"
                        >
                            <div class="Bullet">
                                <span
                                    class="Circle"
                                    :style="{ backgroundColor: color }"
                                />
                            </div>
                        </slot>
                    </template>
                </WLegend>
            </li>
        </ul>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import { sortBy } from 'lodash'
import { toPx, getIsHorizontal, getSpacesByPos } from './utils'
import WLegend from './WLegend.vue'

export default {
    name: 'WLegends',
    type: 'plugins',
    inject: ['Chart'],
    components: {
        WLegend,
    },
    props: {
        text: VueTypes.string,
        position: VueTypes.oneOf(['top', 'bottom', 'left', 'right']).def('bottom'),
        align: VueTypes.oneOf(['start', 'center', 'end']).def('center'),
        space: VueTypes.arrayOf(VueTypes.number).def([16, 16, 16, 16]),
        size: VueTypes.number, // Width or height, with different positiion prop top-bottom/left-right
        selectable: VueTypes.bool.def(false),
        componentsStyles: VueTypes.object,
        wrapperStyles: VueTypes.object,
        legendStyles: VueTypes.object,
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
    data () {
        return {
            styles: {},
        }
    },
    mounted () {
        this.fetchStyles()
    },
    methods: {
        /*
        *  Fetch and calc styles
        */
        fetchStyles () {
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

            this.styles = {
                component: {
                    top: !isHorizontal ? 0 : null,
                    [position]: toPx(spaces[position]),
                    width,
                    height,
                    ...this.componentsStyles,
                },
                wrapper: {
                    ...aligns[isHorizontal ? 'horizontal' : 'vertical'],
                    justifyContent,
                    ...this.wrapperStyles,
                },
            }
        },
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

<style scoped lang="scss">
.WLegends {
    position: absolute;
    display: flex;
}

.Wrapper {
    display: flex;
    flex: 1;
    padding: 0;
    margin: 0;
    list-style: none;
}

.Legend {
    line-height: 1.2;

    &.left + &.left, &.right + &.right {
        margin: .5rem 0 0 0;
    }

    &.top + &.top, &.bottom + &.bottom {
        margin: 0 0 0 .75rem;
    }
}

.Bullet {
    display: inline-block;

    .Circle {
        display: inline-block;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        margin-right: .5rem;
    }
}
</style>
