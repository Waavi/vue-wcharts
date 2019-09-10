<script>
import VueTypes from 'vue-types'

export default {
    name: 'WZAxis',
    axis: 'z',
    props: {
        name: VueTypes.string.def(''),
        datakey: VueTypes.string.isRequired,
        range: VueTypes.array.def([100, 100]),
    },
    preload ({ parent, props, index }) {
        const { datakey, range, name } = props
        parent.axis.z.datakey = datakey
        parent.axis.z.name = name || ''
        parent.axis.z.range = range
    },
}
</script>
