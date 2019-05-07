
<template>
    <div class="WStackBar">
        <span
            v-if="label"
            class="Label"
            :style="labelStyles"
        >{{ label }}</span>
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
                    background: stack.color,
                    maxWidth: `${stack.width}%`,
                    zIndex: stack.zIndex
                }"
            >
                <span
                    v-if="!stack.hide && showValue"
                    class="Value"
                    :style="{
                        color: stack.color
                    }"
                >
                    {{ stack.value }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import VueTypes from 'vue-types'

const MIN_WIDTH = 3

export default {
    name: 'WStackBar',
    props: {
        total: VueTypes.number,
        values: VueTypes.arrayOf(VueTypes.number),
        label: VueTypes.string,
        labelStyles: VueTypes.object,
        showValue: VueTypes.bool,
        stackStyles: VueTypes.object.def({}),
        colors: VueTypes.array.def([
            '#3fb1e3',
            '#6be6c1',
            '#626c91',
            '#a0a7e6',
            '#c4ebad',
            '#96dee8',
        ]),
    },
    computed: {
        stacks () {
            return this.values.reduce((acc, value, index) => {
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
}
</script>
<style scoped lang="scss">
.WStackBar {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.Label {
    margin-right: 35px;
}

.Value {
    position: absolute;
    top: 100%;
    left: 0;
    font-size: 12px;
    font-weight: bold;
}

.Stacks {
    position: relative;
    display: flex;
    flex: 1;
}
.Stack {
    position: relative;
    height: 20px;
    width: 100%;
    max-width: 0%;
    padding-right: 4px;
    border-radius: 3px;
    transition: all 250ms ease;

    & + & {
        margin-left: -4px;
    }
}
</style>
