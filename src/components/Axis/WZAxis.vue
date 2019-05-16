<script>
import VueTypes from 'vue-types'

export default {
    name: 'WZAxis',
    axis: 'z',
    props: {
        datakey: VueTypes.string.isRequired,
        range: VueTypes.array.def([64, 64]),
    },
    preload ({ parent, props, index }) {
        const { datakey, range } = props
        parent.axisZDatakey = datakey
        parent.axisZRange = range
    },
}
</script>
