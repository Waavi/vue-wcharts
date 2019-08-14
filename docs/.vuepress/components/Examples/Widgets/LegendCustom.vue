<template>
    <div>
        <WLegendItem
            v-for="(legend, index) in legends"
            :key="index"
            :index="index"
            :text="legend"
            :style="{ marginBottom: '10px' }"
            active
        >
            <template #bullet="{ color }">
                <span :style="{ fontSize: '18', marginRight: '10px', color }">☎</span>
            </template>
        </WLegendItem>
    </div>
</template>

<script>
export default {
    name: 'LegendCustom',
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