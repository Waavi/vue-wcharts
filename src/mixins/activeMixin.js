import VueTypes from 'vue-types'
import withUidMixin from './withUidMixin'

export default {
    mixins: [
        withUidMixin,
    ],
    inject: ['Chart'],
    props: {
        active: VueTypes.bool.optional,
    },
    computed: {
        isActive () {
            const { Chart, active, uid } = this
            return typeof active === 'boolean'
                ? active
                : !((Chart.legendItems[uid] || {}).active === false)
        },
    },
    watch: {
        isActive (value) {
            if (value) {
                this.activate()
            } else {
                this.deactivate()
            }
        },
    },
    beforeDestroy () {
        this.deactivate()
    },
    methods: {
        activate () {
            throw Error('"activate" method must be implemented')
        },
        deactivate () {
            throw Error('"deactivate" method must be implemented')
        },
    },
}
