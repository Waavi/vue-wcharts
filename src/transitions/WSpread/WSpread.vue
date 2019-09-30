<script>
import VueTypes from 'vue-types'
import WTrans from '../WTrans/WTrans.vue'

export default {
    name: 'WSpread',
    functional: true,
    props: {
        axis: VueTypes.oneOf(['x', 'y']).isRequired,
        transition: VueTypes.string.isRequired,
    },

    render (h, { children, props, parent }) {
        // eslint-disable-next-line no-underscore-dangle
        const id = `WSpread${parent._uid}`
        const { axis, transition } = props

        return h('g', [
            h('defs', [
                h(
                    'clipPath',
                    {
                        attrs: {
                            id,
                        },
                    },
                    [
                        h(
                            WTrans,
                            {
                                props: {
                                    initialProps: {
                                        width: axis === 'x' ? 0 : '100%',
                                        height: axis === 'y' ? 0 : '100%',
                                    },
                                    transition,
                                },
                            },
                            [
                                h('rect', {
                                    attrs: {
                                        x: 0,
                                        y: 0,
                                        width: '100%',
                                        height: '100%',
                                    },
                                }),
                            ]
                        ),
                    ]
                ),
            ]),
            h(
                'g',
                {
                    attrs: {
                        'clip-path': `url(#${id})`,
                    },
                },
                children
            ),
        ])
    },
}
</script>
