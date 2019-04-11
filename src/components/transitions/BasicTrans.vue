<template>
    <Transition
        appear
        @beforeAppear="beforeAppear"
        @appear="appear"
    >
        <slot />
    </Transition>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'BasicTrans',
    props: {
        initialProps: VueTypes.object.isRequired,
        transition: VueTypes.string.isRequired,
    },
    methods: {
        beforeAppear (el) {
            Object.keys(this.initialProps).forEach((key) => {
                const val = this.initialProps[key]
                const to = el.getAttribute(key)
                el.setAttribute(`data-${key}`, to)
                el.setAttribute(key, val)
            })
        },
        appear (el) {
            setTimeout(() => {
                el.style.transition = this.transition
                el.style.WebkitTransition = this.transition
                el.style.msTransition = this.transition
                el.style.MozTransition = this.transition
                Object.keys(this.initialProps).forEach((key) => {
                    const to = el.getAttribute(`data-${key}`)
                    el.setAttribute(key, to)
                    el.removeAttribute(`data-${key}`)
                })
            })
        },
    },
}
</script>
