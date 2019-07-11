<template>
    <span
        class="WBullet"
        :style="bulletStylesCmp"
    />
</template>

<script>
import VueTypes from 'vue-types'
import themeMixin from '../../../mixins/theme'

export default {
    name: 'WBullet',
    mixins: [
        themeMixin,
    ],
    props: {
        styles: VueTypes.object.def({}),
    },
    computed: {
        bulletStylesCmp () {
            return {
                ...this.themeStyles.styles,
                ...this.styles,
            }
        },
    },
}
</script>
