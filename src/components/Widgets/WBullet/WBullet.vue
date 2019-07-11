<template>
    <span
        class="WBullet"
        :style="bulletStyles"
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
        bulletStyles () {
            return {
                ...this.themeStyles.bullet,
                ...this.styles,
            }
        },
    },
}
</script>
