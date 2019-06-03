<template functional>
    <span
        class="WBullet"
        :style="{ background: props.color }"
    />
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'WBullet',
    props: {
        color: VueTypes.string.isRequired,
    },
}
</script>

<style scoped lang="scss">
.WBullet {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: .5rem;
}
</style>
