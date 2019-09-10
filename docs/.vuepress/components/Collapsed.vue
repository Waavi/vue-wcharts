<template>
    <Transition
        name="height-fade"
        :tag="tag"
        :appear="appear"
        @enter="enter"
        @afterEnter="afterEnter"
        @leave="leave"
    >
        <div v-if="collapsed">
            <slot />
        </div>
    </Transition>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'FadeHeightTransition',
    props: {
        collapsed: VueTypes.bool.def(true),
        tag: VueTypes.string.def('span'),
        appear: VueTypes.bool.def(false),
    },
    methods: {
        enter (el) {
            const elementHeight = getComputedStyle(el).height
            el.style.height = 0
            setTimeout(() => {
                el.style.height = elementHeight
            })
        },
        afterEnter (el) {
            el.style.height = 'auto'
        },
        leave (el) {
            el.style.height = getComputedStyle(el).height
            setTimeout(() => {
                el.style.height = 0
            })
        },
    },
}
</script>
<style lang="scss">
.height-fade-enter-active {
    transition: opacity 250ms 250ms ease, height 250ms ease;
    overflow: hidden;
}

.height-fade-leave-active {
    transition: opacity 250ms ease, height 250ms 250ms ease;
    overflow: hidden;
}

.height-fade-enter,
.height-fade-leave-to {
    opacity: 0;
}
</style>
