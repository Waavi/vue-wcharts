<template>
    <div
        v-if="!hide"
        class="WShowIfFit"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'WShowIfFit',
    data () {
        return {
            hide: false,
        }
    },
    mounted () {
        this.$nextTick(this.handleSize)
    },
    methods: {
        handleSize () {
            const { children = [], parentNode } = this.$el

            if (children.length) {
                const childrenWidth = Object.keys(children).reduce((a, b) => a + children[b].offsetWidth, 0)
                const parentWidth = parentNode.clientWidth
                this.hide = parentWidth < childrenWidth
            }
        },
    },
}
</script>
