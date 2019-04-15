import VueTypes from 'vue-types'

export default {
    props: {
        animated: VueTypes.bool.def(true),

        transDuration: VueTypes.number.def(1),

        transEffect: VueTypes.string.def('ease'),
    },

    computed: {
        transition () {
            return (
                this.animated
                    ? `all ${this.transDuration}s ${this.transEffect}`
                    : 'none'
            )
        },
    },
}
