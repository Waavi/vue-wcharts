
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
                        ...styles,
                        opacity: launchAnimation ? 1 : 0,
                        background: stack.color,
                        maxWidth: `${stack.width}%`,
                        ...(trigger === 'click' ? { cursor: 'pointer' } : {}),
                    }"
                    v-on="stackListeners"
                >
                    <div
                        class="Value"
                        :style="labelStyles"
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
                <template #default="{ value: [first] }">
                    <div class="Wrapper">
                        <div class="TooltipItem">
                            <WBullet :styles="{ background: first.color }" />
                            <slot
                                name="tooltip"
                                v-bind="first"
                            >
                                {{ first.value }}
                            </slot>
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
                    left: `${marker.left}%`,
                    ...markerStyles,
                    ...(trigger === 'click' ? { cursor: 'pointer' } : {}),
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
import merge from 'lodash.merge'
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
        trigger: VueTypes.oneOf(['hover', 'click', 'manual']).def('hover'),
        markers: VueTypes.arrayOf(VueTypes.number).def([]),
        total: VueTypes.number,
        labelStyles: VueTypes.object,
        showLabel: VueTypes.bool.def(false),
        styles: VueTypes.object.def({}),
        markerStyles: VueTypes.object.def({}),
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
                    if (this.trigger === 'click') this.handleActive(event, this.getStack)
                    this.$emit('onClick', this.info)
                },
                mouseenter: (event) => {
                    if (this.trigger === 'hover') this.handleActive(event, this.getStack)
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
                    if (this.trigger === 'click') this.handleActive(event, this.getMarker)
                    this.$emit('onClickMarker', this.info)
                },
                mouseenter: (event) => {
                    if (this.trigger === 'hover') this.handleActive(event, this.getMarker)
                    this.$emit('onMouseenterMarker')
                },
                mouseleave: () => {
                    if (['hover', 'click'].includes(this.trigger)) this.cleanActive()
                    this.$emit('onMouseleaveMarker')
                },
            })
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
        handleActive (event, getValue) {
            const { id, offsetLeft } = event.target
            this.setActive({ id, value: getValue(id), offsetLeft }, event)
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
                color: '#000',
                value: this.stackMarkers[id].value,
            }]
        },
    },
}
</script>
<style scoped lang="scss">
.WSimpleHStackBar {
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
    background: #FFF;
    transform: rotate(45deg) translateY(7px);
    outline: 1px solid;
}

.TooltipItem {
    display: flex;
    align-items: center;
}
</style>
