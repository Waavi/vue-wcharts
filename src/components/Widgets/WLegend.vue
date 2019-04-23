<template>
    <div
        v-if="!!Cartesian.legends.length"
        class="WLegend"
        :style="styles"
    >
        <a
            v-for="(legend, index) in Cartesian.legends"
            :key="legend"
            :title="legend"
            class="Legend"
            :class="{ selectable, selected: Cartesian.activeCartesians.includes(index), [position]: true }"
            :style="legendStylesCmp"
            :data-index="index"
            @click.prevent="handleClick({ legend, index })"
        >
            <slot
                name="bullet"
                :index="index"
                :legend="legend"
                :styles="{
                    color: Cartesian.colors[index],
                    ...legendStylesCmp
                }"
            >
                <div>
                    <span
                        class="Bullet"
                        :style="{ backgroundColor: Cartesian.colors[index] }"
                    />
                </div>
            </slot>
            <span
                class="Text"
                :class="{ ellipsis }"
            >{{ legend }}</span>
        </a>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import { getSpacesByPos, toPx } from './utils'

const containerStylesDefaultProp = {
    boxSizing: 'border-box',
}

const legendStylesDefaultProp = {
    fontSize: '12px',
}

export default {
    name: 'WLegend',
    type: 'plugins',
    inject: ['Cartesian'],
    props: {
        text: VueTypes.string,
        position: VueTypes.oneOf(['top', 'bottom', 'left', 'right']).def('bottom'),
        align: VueTypes.oneOf(['start', 'center', 'end']).def('end'),
        space: VueTypes.arrayOf(VueTypes.number).def([16, 16, 16, 16]),
        size: VueTypes.number, // Width or height, with different positiion prop top-bottom/left-right
        ellipsis: VueTypes.bool.def(false), // Alow ellipsis in long texts
        selectable: VueTypes.bool.def(false),
        selecteds: VueTypes.array.def([]),
        // Styles
        containerStyles: VueTypes.object.def(() => ({
            ...containerStylesDefaultProp,
        })),
        legendStyles: VueTypes.shape({
            color: VueTypes.string,
            fontSize: VueTypes.string,
        }).def(() => ({
            ...legendStylesDefaultProp,
        })),
    },
    data () {
        return {
            width: 0,
            height: 0,
            styles: {},
        }
    },
    computed: {
        legendStylesCmp () {
            return {
                ...legendStylesDefaultProp,
                ...this.legendStyles,
            }
        },
    },
    mounted () {
        this.fetchStyles()
    },
    methods: {
        /*
        *  Fetch and calc styles
        */
        fetchStyles () {
            const { position, size } = this
            // Directions
            const isHorizontal = ['top', 'bottom'].includes(position)
            const direction = isHorizontal ? 'horizontal' : 'vertical'
            // Positions
            const width = !isHorizontal ? size || 85 : null
            const height = isHorizontal ? size || 20 : null
            // Spaces
            const [topParent, rightParent, bottomParent, leftParent] = this.Cartesian.space
            const [top, right, bottom, left] = this.space
            const spaces = {
                top, bottom, left, right,
            }
            // Styles by direction
            const aligns = {
                vertical: {
                    start: { top: toPx(topParent) },
                    end: { bottom: toPx(bottomParent) },
                    center: {
                        top: '50%',
                        transform: `translateY(-50%)`,
                    },
                },
                horizontal: {
                    start: { left: toPx(leftParent) },
                    end: { right: toPx(rightParent) },
                    center: {
                        left: '50%',
                        transform: `translateX(-50%)`,
                    },
                },
            }

            // Resize parent
            const innerWidth = spaces.right + spaces.left + width
            const innerHeight = spaces.top + spaces.bottom + height
            this.Cartesian.increaseSpace(getSpacesByPos(position, { width: innerWidth, height: innerHeight }))
            // Set styles
            this.styles = {
                ...aligns[direction][this.align],
                [position]: toPx(spaces[position]),
                width: width ? toPx(width) : null,
                height: height ? toPx(height) : null,
                ...containerStylesDefaultProp,
                ...this.containerStyles,
            }
        },
        /*
        *  Handle on click legend, if has selectable prop true
        */
        handleClick ({ legend, index }) {
            if (!this.selectable) return
            let actives = [...this.Cartesian.activeCartesians]

            if (!actives.includes(index)) actives.push(index)
            else actives = actives.filter(n => n !== index)

            this.Cartesian.activeCartesians = actives
        },
    },
}
</script>

<style scoped lang="scss">
.WLegend {
    position: absolute;
}
.Legend {
    opacity: .5;
    transition: opacity .3s ease;
    cursor: default;

    &.left, &.right {
        display: flex;
    }

    &.left + &.left, &.right + &.right {
        margin: .5rem 0 0 0;
    }

    &.top + &.top, &.bottom + &.bottom {
        margin: 0 0 0 .75rem;
    }

    &.selected {
        opacity: 1;
    }

    &.selectable {
        cursor: pointer;
    }

    .Bullet {
        display: inline-block;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        margin-right: .5rem;
    }

    .Text {
        &.ellipsis {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
