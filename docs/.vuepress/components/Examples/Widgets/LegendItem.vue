<template>
    <div>
        <WLegendItem
            v-for="(legend, index) in legends"
            :key="index"
            :index="index"
            :text="legend"
            :style="{ marginBottom: '10px' }"
            active
        />
    </div>
</template>

<script>
export default {
    name: 'LegendItem',
    data () {
        return {
            legends: [
                'Corrective costs',
                'Preventive costs',
                'Future costs',
            ],
        }
    }
}
</script>