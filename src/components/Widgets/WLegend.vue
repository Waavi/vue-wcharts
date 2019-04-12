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
            :class="{ selectable, selected: Cartesian.activeCartesians.includes(index) }"
            :style="legendStylesCmp"
            :data-index="index"
            @click.prevent="handleClick({ legend, index })"
        >
            <slot
                name="bullet"
                :legend="{ legend, index }"
            >
                <span
                    class="bullet"
                    :style="{ backgroundColor: Cartesian.colors[index] }"
                />
            </slot>
            <span>{{ legend }}</span>
        </a>
    </div>
</template>

<script>
import VueTypes from 'vue-types'

const containerStylesDefaultProp = {
    boxSizing: 'border-box',
}

const legendStylesDefaultProp = {
    color: '#999',
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
        selectable: VueTypes.bool.def(false),
        selecteds: VueTypes.array.def([]),
        /** Styles */
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
    computed: {
        styles () {
            const { position } = this
            const horizontal = ['top', 'bottom'].includes(this.position)
            const flexDirection = !horizontal ? 'column' : 'row'
            const justifyContent = this.align === 'center' ? 'center' : `flex-${this.align}`

            const top = !horizontal ? '0' : 'auto'
            const left = horizontal ? '0' : 'auto'
            const width = horizontal ? '100%' : 'auto'
            const height = !horizontal ? '100%' : 'auto'

            return {
                top,
                left,
                [position]: '0',
                width,
                height,
                flexDirection,
                justifyContent,
                ...containerStylesDefaultProp,
                ...this.containerStyles,
            }
        },
        legendStylesCmp () {
            return {
                ...legendStylesDefaultProp,
                ...this.legendStyles,
            }
        },
    },
    methods: {
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
.Legend {
    margin: 0 0 0 .75rem;
    opacity: .5;
    transition: opacity .3s ease;
    cursor: default;

    &.selected {
        opacity: 1;
    }

    &.selectable {
        cursor: pointer;
    }

    .bullet {
        display: inline-block;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        margin-right: .5rem;
    }
}
</style>
