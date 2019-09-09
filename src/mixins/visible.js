import VueTypes from 'vue-types'
import sortBy from 'lodash.sortby'

export default {
    props: {
        visible: VueTypes.bool.def(true), // false to hide (for an external legend)
    },
    watch: {
        visible: {
            handler (val) {
                let actives = [...this.Chart.activeElements]
                if (!val) {
                    actives = actives.filter(n => n !== this.index)
                } else if (!actives.includes(this.index)) {
                    actives.push(this.index)
                }
                this.Chart.activeElements = sortBy(actives)
            },
            immediate: true,
        },
    },
}
