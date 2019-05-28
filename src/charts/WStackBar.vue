
<template>
    <div class="WStackBar">
        <div
            v-if="stacks"
            class="Container"
        >
            <div
                v-if="launchAnimation"
                class="Start"
            >
                <slot
                    name="start"
                    :total="sumValues"
                />
            </div>

            <div
                v-if="stacks"
                class="Stacks"
            >
                <div
                    v-for="(stack, index) in stacks"
                    v-show="!(stack.value <= 0)"
                    :id="stack.id"
                    :key="`stack-${stack.id}`"
                    class="Stack"
                    :class="{ First: index === 0, Last: index === stacks.length - 1 }"
                    :style="{
                        ...stackStyles,
                        opacity: launchAnimation ? 1 : 0,
                        background: stack.color,
                        maxWidth: `${stack.width}%`,
                    }"
                    @mouseenter="handleMouseEnter"
                    @mouseleave="handleMouseLeave"
                >
                    <div
                        class="Value"
                        :style="valueStyles"
                    >
                        <slot
                            v-if="!stack.hide && showValue"
                            name="value"
                            :index="stack.id"
                            :value="stack.value"
                            :percentage="stack.width|percentage"
                            :color="stack.color"
                        >
                            <span
                                :style="{
                                    color: stack.color
                                }"
                            >{{ stack.value }}</span>
                        </slot>
                    </div>
                </div>
            </div>

            <WTooltip>
                <template #default="tooltip">
                    <div class="Wrapper">
                        <div class="flex row-center">
                            <div class="Bullet">
                                <div
                                    class="Bullet"
                                    :style="{ background: tooltip.value[0].color }"
                                />
                            </div>
                            <WText
                                color="white"
                                size="sm"
                                weight="bold"
                                class="mb-0"
                            >
                                <slot
                                    name="tooltip"
                                    v-bind="tooltip.value[0]"
                                >
                                    {{ tooltip.value[0].value }}
                                </slot>
                            </WText>
                        </div>
                    </div>
                </template>
            </WTooltip>

            <div
                v-for="marker in stackMarkers"
                v-show="!(marker.value <= 0)"
                :id="marker.id"
                :key="`marker-${marker.id}`"
                data-type="marker"
                class="Marker"
                :style="{
                    left: `${marker.left}%`
                }"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
            >
                <slot
                    name="marker"
                    :value="marker"
                >
                    <div :data-value="marker.value" />
                </slot>
            </div>

            <div
                v-if="launchAnimation"
                class="End"
            >
                <slot
                    name="end"
                    :total="sumValues"
                />
            </div>
        </div>
    </div>
</template>

<script>
import VueTypes from 'vue-types'

import activeMixin from '../mixins/active'
import animationMixin from '../mixins/animation'
import themeMixin from '../mixins/theme'

const MIN_WIDTH = 4

export default {
    name: 'WStackBar',
    provide () {
        return {
            Chart: this,
        }
    },
    filters: {
        // Transform value to percentage string
        percentage (value) {
            return `${value.toFixed(2)}%`
        },
    },
    mixins: [
        activeMixin,
        themeMixin,
        animationMixin,
    ],
    props: {
        total: VueTypes.number,
        values: VueTypes.arrayOf(VueTypes.number).def([]),
        markers: VueTypes.arrayOf(VueTypes.number).def([]),
        valueStyles: VueTypes.object,
        showValue: VueTypes.bool.def(false),
        withoutTooltip: VueTypes.bool.def(false),
        stackStyles: VueTypes.object.def({}),
        delay: VueTypes.number.def(300),
        minWidth: VueTypes.number,
    },
    data () {
        return {
            launchAnimation: false,
            offset: this.minWidth || MIN_WIDTH,
        }
    },
    computed: {
        // Used total prop binding or the sum of all values
        totalValues () {
            return this.total || this.sumValues
        },
        // Sum values
        sumValues () {
            return this.values.reduce((a, b) => a + b)
        },
        // Generate and calc stack values
        stacks () {
            const values = this.launchAnimation ? this.values : Array.from({ length: this.values.length })
            return values.reduce((acc, value, index) => {
                if (value === 0) return acc
                const width = (value * 100 / this.totalValues)
                acc.push({
                    id: index,
                    value,
                    color: this.colors[index],
                    width,
                    hide: width < this.offset,
                })

                return acc
            }, [])
        },
        // Generate and calc markers values
        stackMarkers () {
            const markers = this.launchAnimation ? this.markers : []
            return markers.map((value, index) => ({
                id: index,
                left: (value * 100 / this.totalValues),
                value,
            }))
        },
    },
    mounted () {
        // Added delay to animate stack
        setTimeout(this.launch, this.delay)
    },
    methods: {
        // Enable launch animation
        launch () {
            this.launchAnimation = true
        },
        // Set active bar element, to show tooltip
        handleMouseEnter (event) {
            if (this.withoutTooltip) return
            const { id, offsetLeft, dataset } = event.target
            const value = this[dataset.type !== 'marker' ? 'getStack' : 'getMarker'](id)
            this.setActive({ id, value, offsetLeft }, event)
        },
        // Clean active element, to hide tooltip
        handleMouseLeave () {
            this.cleanActive()
        },
        // Return stack value of id
        getStack (id) {
            const { value, width } = this.stacks.find(stack => stack.id === parseInt(id, 0)) || {}
            return [{
                key: id,
                color: this.colors[id],
                value,
                width,
            }]
        },
        // Return marker value of id
        getMarker (id) {
            return [{
                key: id,
                color: '#FFF',
                value: this.stackMarkers[id].value,
            }]
        },
    },
}
</script>
<style scoped lang="scss">
.WStackBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.Container {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
}

.Value {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    max-width: 100%;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.Stacks {
    display: flex;
    flex: 1;
    align-items: center;
    height: 20px;
}

.Stack {
    position: relative;
    display: flex;
    flex: 1;
    height: 20px;
    width: 100%;
    max-width: 0%;
    transition: all 250ms ease;

    &.First {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    &.Last {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
}

.Marker {
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    background: white;
    transform: rotate(45deg) translateY(7px);
    outline: 1px solid;
}

.Bullet {
    line-height: 0.9;
}
</style>
