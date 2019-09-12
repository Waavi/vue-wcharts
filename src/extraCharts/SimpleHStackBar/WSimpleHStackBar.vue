
<template>
    <div class="WSimpleHStackBar">
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

            <div class="Stacks">
                <div
                    v-for="(stack, index) in stacks"
                    v-show="!(stack.value <= 0)"
                    :id="stack.id"
                    :key="`stack-${stack.id}`"
                    class="Stack"
                    :class="{ First: index === 0, Last: index === stacks.length - 1 }"
                    :style="{
                        ...barStylesCmp,
                        opacity: launchAnimation ? 1 : 0,
                        background: stack.color,
                        maxWidth: `${stack.width}%`,
                    }"
                    v-on="stackListeners"
                >
                    <div
                        class="Value"
                        :style="labelStylesCmp"
                    >
                        <WShowIfFit>
                            <slot
                                v-if="!stack.hide && showLabel"
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
                        </WShowIfFit>
                    </div>
                </div>
            </div>

            <WTooltip>
                <template #default="{ value: [data] }">
                    <div class="Toolip">
                        <WBullet :styles="{ background: data.color }" />
                        <slot
                            name="tooltip"
                            v-bind="data"
                        >
                            {{ data.value }}
                        </slot>
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
                    left: `${marker.left}%`,
                    ...markerStylesCmp,
                }"
                v-on="markerListeners"
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
import merge from '../../utils/merge'
import { WTooltip, WBullet, WShowIfFit } from '../../components/Widgets'
import activeMixin from '../../mixins/active'
import animationMixin from '../../mixins/animation'
import themeMixin from '../../mixins/theme'

const MIN_WIDTH = 4

export default {
    name: 'WSimpleHStackBar',
    components: {
        WTooltip,
        WBullet,
        WShowIfFit,
    },
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
        dataset: VueTypes.arrayOf(VueTypes.number).def([]),
        markers: VueTypes.arrayOf(VueTypes.number).def([]),
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        total: VueTypes.number,
        showLabel: VueTypes.bool.def(false),
        delay: VueTypes.number.def(300),
        minWidth: VueTypes.number,
        // Styles
        styles: VueTypes.object.def({}),
        labelStyles: VueTypes.object,
        markerStyles: VueTypes.object.def({}),
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
            return this.dataset.reduce((a, b) => a + b)
        },
        // Generate and calc stack values
        stacks () {
            const values = this.launchAnimation ? this.dataset : Array.from({ length: (this.dataset || []).length })
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
        // Event Listeners
        stackListeners () {
            return merge({}, this.$listeners, {
                click: (event) => {
                    if (this.trigger === 'click') this.handleActive(event)
                    this.$emit('onClick', this.info)
                },
                mouseenter: (event) => {
                    if (this.trigger === 'hover') this.handleActive(event)
                    this.$emit('onMouseenter')
                },
                mouseleave: () => {
                    if (['hover', 'click'].includes(this.trigger)) this.cleanActive()
                    this.$emit('onMouseleave')
                },
            })
        },
        markerListeners () {
            return merge({}, this.$listeners, {
                click: (event) => {
                    if (this.trigger === 'click') this.handleActiveMarker(event)
                    this.$emit('onClickMarker', this.info)
                },
                mouseenter: (event) => {
                    if (this.trigger === 'hover') this.handleActiveMarker(event)
                    this.$emit('onMouseenterMarker')
                },
                mouseleave: () => {
                    if (['hover', 'click'].includes(this.trigger)) this.cleanActive()
                    this.$emit('onMouseleaveMarker')
                },
            })
        },
        // Styles
        barStylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
                ...(this.trigger === 'click' ? { cursor: 'pointer' } : {}),
            }
        },
        labelStylesCmp () {
            return {
                ...this.themeStyles.label,
                ...this.labelStyles,
            }
        },
        markerStylesCmp () {
            return {
                ...this.themeStyles.marker,
                ...this.markerStyles,
                ...(this.trigger === 'click' ? { cursor: 'pointer' } : {}),
            }
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
        // Set active marker, to show tooltip
        handleActiveMarker (event) {
            const { id, offsetLeft } = event.target
            const value = [{ key: id, color: this.markerStylesCmp.background, value: this.stackMarkers[id].value }]
            this.setActive({
                id, value, offsetLeft,
            }, event)
        },
        // Set active bar, to show tooltip
        handleActive (event, isMarker) {
            const { id, offsetLeft } = event.target
            const data = this.stacks.find(stack => stack.id === parseInt(id, 0)) || {}
            const value = [{
                key: id,
                color: this.colors[id],
                value: data.value,
                width: data.width,
            }]
            return this.setActive({
                id, value, data, offsetLeft,
            }, event)
        },
    },
}
</script>
<style scoped lang="scss">
.center {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
}

.WSimpleHStackBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.Container {
    @extend .center
}

.Value {
    max-width: 100%;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.Stacks {
    @extend .center;
}

.Stack {
    @extend .center;
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

.Toolip {
    display: flex;
    align-items: center;
}
</style>
