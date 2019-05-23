<template>
    <a
        class="WLegend"
        :title="text"
        :class="{ selected, active }"
        :style="styles"
        @click.prevent="$emit('onClick', { text, index })"
        @mouseenter="$emit('onMouseenter', { text, index })"
        @mouseleave="$emit('onMouseleave', { text, index })"
    >
        <slot
            name="bullet"
            :index="index"
            :text="text"
            :color="colorCmp"
        >
            <div class="Bullet">
                <span
                    class="Circle"
                    :style="{ backgroundColor: colorCmp }"
                />
            </div>
        </slot>
        <span class="Text">{{ text }}</span>
    </a>
</template>

<script>
import VueTypes from 'vue-types'
import themeMixin from '../../mixins/theme'

export default {
    name: 'WLegend',
    mixins: [themeMixin],
    props: {
        index: VueTypes.oneOfType([Number, String]),
        text: VueTypes.string,
        active: VueTypes.bool.def(false),
        selected: VueTypes.bool.def(false),
        styles: VueTypes.object,
        textStyles: VueTypes.object,
        color: VueTypes.string,
    },
    computed: {
        // Get color value. Color prop, Color theme by index or color by defualt
        colorCmp () {
            if (this.color) return this.color
            if (this.index) return this.colors[this.index]
            return this.colors[0]
        },
    },
}
</script>

<style scoped lang="scss">
.WLegend {
    display: flex;
    font-size: 12px;
    opacity: .5;
    transition: opacity .3s ease;
    cursor: pointer;

    &.selected, &.active {
        opacity: 1;
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
