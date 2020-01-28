<template>
    <div
        class="Legend"
        :style="style"
    >
        <div
            v-for="{ uid, label, color, shape, active } in items"
            :key="uid"
            class="LegendItem"
            :class="{ active }"
            @click="() => toggleItem(uid)"
        >
            <div class="BulletWrapper">
                <slot
                    name="bullet"
                    :color="color"
                    :shape="shape"
                >
                    <div
                        class="DefaultBullet"
                        :class="shape"
                        :style="{ backgroundColor: color }"
                    />
                </slot>
            </div>
            <div class="Label">
                <slot
                    name="label"
                    :label="label"
                    :color="color"
                >
                    {{ label }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import outerElementMixin from '../../mixins/outerElementMixin'

const LEGEND_POSITION = {
    TOP_LEFT: 'top-left',
    TOP_CENTER: 'top-center',
    TOP_RIGHT: 'top-right',
}

export default {
    name: 'Legend',
    type: 'widget',
    inject: ['Chart'],
    mixins: [outerElementMixin],
    props: {
        position: VueTypes.oneOf([
            LEGEND_POSITION.TOP_LEFT,
            LEGEND_POSITION.TOP_CENTER,
            LEGEND_POSITION.TOP_RIGHT,
        ]).def(LEGEND_POSITION.TOP_RIGHT),
    },
    computed: {
        layoutInOuterArea () {
            const { position } = this
            const outerPosition = position.includes('top-') ? 'top' : 'bottom'
            return {
                reference: 'canvas',
                order: 0, // it should be the first one
                position: outerPosition,
                top: 0,
                right: 0,
                height: 30,
                width: 100,
            }
        },
        style () {
            const {
                top, width, height, right,
            } = this.layoutInOuterArea
            return {
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
                right: `${right}px`,
            }
        },
        items () {
            const { legendItems } = this.Chart
            return Object.keys(legendItems).map(uid => ({ ...legendItems[uid], uid }))
        },
    },
    methods: {
        toggleItem (uid) {
            const data = this.Chart.legendItems[uid]
            if (data) {
                this.Chart.legendItems[uid] = { ...data, active: !data.active }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.Legend {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid black;
}
.LegendItem {
    display: flex;
    align-items: center;
    flex-wrap: no-wrap;
    opacity: 0.5;
    &.active {
        opacity: 1;
    }
}
.DefaultBullet {
    margin-right: 5px;
    &.circle {
        width: 10px;
        height: 10px;
        border-radius: 5px;
    }
}
</style>
