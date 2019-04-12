<script>
import VueTypes from 'vue-types'

export default {
    name: 'Trans',
    functional: true,
    props: {
        initialProps: VueTypes.object.isRequired,
        transition: VueTypes.string.isRequired,
    },
    render (h, { children, props }) {
        return h(
            'transition',
            {
                props: {
                    appear: true,
                },
                on: {
                    beforeAppear (el) {
                        Object.keys(props.initialProps).forEach((key) => {
                            const val = props.initialProps[key]
                            const to = el.getAttribute(key)
                            el.setAttribute(`data-${key}`, to)
                            el.setAttribute(key, val)
                        })
                    },

                    appear (el) {
                        setTimeout(() => {
                            el.style.transition = props.transition
                            el.style.WebkitTransition = props.transition
                            el.style.msTransition = props.transition
                            el.style.MozTransition = props.transition
                            Object.keys(props.initialProps).forEach((key) => {
                                const to = el.getAttribute(`data-${key}`)
                                el.setAttribute(key, to)
                                el.removeAttribute(`data-${key}`)
                            })
                        })
                    },
                },
            },
            children
        )
    },
}
</script>
