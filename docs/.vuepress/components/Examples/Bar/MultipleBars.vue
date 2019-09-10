<template>
    <WCartesian
        :dataset="data"
        :height="300"
        :bound="[0,n => n * 1.25]"
        responsive
    >
        <WBar datakey="one" />

        <WXAxis
            datakey="name"
            :space="[0, 50, 50, 50]"
            :numTicks="0"
        />
        <WYAxis :space="[25, 0, 0, 50]" />
        <WTooltip />
    </WCartesian>
</template>

<script>
export default {
    name: 'MultipleBars',
    data () {
        return {
            data: Array.from({ length: 50 }).map((num, index) => ({ name: `Line ${index}`, one: (50000 - (index * 1000 )) })),
        }
    }
}
</script>