
<template>
    <div class="WStackBar">
        <div
            v-if="stacks"
            class="Stacks"
        >
            <div
                v-for="stack in stacks"
                :key="stack.id"
                class="Stack"
                :style="{
                    ...stackStyles,
                    opacity: launchAnimation ? 1 : 0,
                    background: stack.color,
                    maxWidth: `${stack.width}%`,
                    paddingRight: `${offset}px`,
                    marginLeft: stack.id > 0 && `-${offset}px`
                }"
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
    </div>
</template>

<script>
import VueTypes from 'vue-types'

import animationMixin from '../mixins/animation'
import themeMixin from '../mixins/theme'

const MIN_WIDTH = 4

export default {
    name: 'WStackBar',
    filters: {
        percentage (value) {
            return `${value.toFixed(2)}%`
        },
    },
    mixins: [themeMixin, animationMixin],
    props: {
        total: VueTypes.number,
        values: VueTypes.arrayOf(VueTypes.number).def([]),
        valueStyles: VueTypes.object,
        showValue: VueTypes.bool.def(false),
        stackStyles: VueTypes.object.def({}),
        delay: VueTypes.number.def(300),
    },
    data () {
        return {
            launchAnimation: false,
            offset: MIN_WIDTH,
        }
    },
    computed: {
        stacks () {
            const values = this.launchAnimation ? this.values : Array.from({ length: this.values.length })
            return values.reduce((acc, value, index) => {
                const width = (value * 100 / this.total)
                acc.push({
                    id: index,
                    value,
                    color: this.colors[index],
                    width,
                    hide: width < MIN_WIDTH,
                })

                return acc
            }, [])
        },
    },
    mounted () {
        setTimeout(this.launch, this.delay)
    },
    methods: {
        launch () {
            this.launchAnimation = true
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
    position: relative;
    display: flex;
    flex: 1;

    > div {
        position: relative;
        display: flex;
        flex: 1;
    }
}
.Stack {
    position: relative;
    height: 20px;
    width: 100%;
    max-width: 0%;
    border-radius: 3px;
    transition: all 250ms ease;
}
</style>
