import VueTypes from 'vue-types'
import drawableCartesianMixin from '../../mixins/drawable/drawableCartesianMixin'

export default {
    inject: ['Stack'],
    mixins: [
        drawableCartesianMixin,
    ],
    props: {
        datakey: VueTypes.string.optional,
    },
    computed: {
        baseAxisDimension () {
            const { Stack } = this
            return Stack.Chart.axisDefinitions[Stack.actualBaseAxisId].dimension
        },
        dataValues () {
            const { Stack } = this
            return Stack.dataValuesByUid[this.uid]
        },
    },
    watch: {
        datakey: {
            handler (dk) {
                this.activate(dk)
            },
            immediate: true,
        },
    },
    methods: {
        activate (datakey = this.datakey) {
            this.Stack.registerIntoStack(this.uid, datakey)
        },
        deactivate () {
            this.Stack.unregisterIntoStack(this.uid)
        },
    },
}
