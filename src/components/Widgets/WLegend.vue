<template>
    <div
        v-if="!!Cartesian.legends.length"
        class="WLegend"
        :style="styles"
    >
        <ul
            class="Wrapper"
            :style="stylesWrapper"
        >
            <li
                v-for="(legend, index) in Cartesian.legends"
                :key="legend"
                class="Legend"
                :class="{[position]: true}"
            >
                <a
                    :title="legend"
                    class="Link"
                    :class="{ selectable, selected: Cartesian.activeCartesians.includes(index) }"
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
                        <div class="Bullet">
                            <span
                                class="Circle"
                                :style="{ backgroundColor: Cartesian.colors[index] }"
                            />
                        </div>
                    </slot>
                    <span>{{ legend }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import { getSpacesByPos, toPx } from './utils'

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
        align: VueTypes.oneOf(['start', 'center', 'end']).def('center'),
        space: VueTypes.arrayOf(VueTypes.number).def([16, 16, 16, 16]),
        size: VueTypes.number, // Width or height, with different positiion prop top-bottom/left-right
        selectable: VueTypes.bool.def(false),
        selecteds: VueTypes.array.def([]),
        // Styles
        legendStyles: VueTypes.shape({
            color: VueTypes.string,
            fontSize: VueTypes.string,
        }).def(() => ({
            ...legendStylesDefaultProp,
        })),
    },
    preload ({ parent, props, index }) {
        const { position, size, space } = props
        // Positions
        const isHorizontal = ['top', 'bottom'].includes(position)
        const innerWidth = !isHorizontal ? size || 85 : null
        const innerHeight = isHorizontal ? size || 20 : null
        // Spaces
        const [top, right, bottom, left] = space || [16, 16, 16, 16]
        const width = right + left + innerWidth
        const height = top + bottom + innerHeight
        // Resize parent
        const spaces = getSpacesByPos(position, { width, height }, parent.spaceObjects)
        parent.addSpace(spaces)
    },
    data () {
        return {
            styles: {},
            stylesWrapper: {},
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
            const { position, align, size } = this
            const isHorizontal = ['top', 'bottom'].includes(position)
            // Spaces
            const [topParent, rightParent, bottomParent, leftParent] = this.Cartesian.space
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
                top: !isHorizontal ? 0 : null,
                [position]: toPx(spaces[position]),
                width: isHorizontal ? '100%' : size || toPx(85),
                height: !isHorizontal ? '100%' : size || toPx(20),
            }

            this.stylesWrapper = {
                ...aligns[isHorizontal ? 'horizontal' : 'vertical'],
                justifyContent,
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

.Link {
    display: flex;
    opacity: .5;
    transition: opacity .3s ease;
    cursor: default;

    &.selected {
        opacity: 1;
    }

    &.selectable {
        cursor: pointer;
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
