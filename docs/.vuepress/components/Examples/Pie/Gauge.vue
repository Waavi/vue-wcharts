<template>
        <WPieChart
        :dataset="data"
        responsive
    >
        <WGauge
            datakey="one"
            borderRadius="20"
            :maxValue="100"
            :startAngle="180"
            :endAngle="0"
            :radius="[110, 150]"
        >
            <div
                class="WPieContent"
                :style="{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: '100%',
                }"
            >
                <span
                    :style="{
                        paddingTop: '100px',
                        fontSize: '20px',
                        textAlign: 'center',
                        color: '#888',
                    }"
                >
                    {{total}} %
                    <span
                        :style="{
                            display: 'block',
                            marginTop: '5px',
                            fontWeight: 'bold',
                        }"
                    >Total</span>
                </span>
            </div>
        </WGauge>
    </WPieChart>
</template>

<script>
export default {
    name: 'Custom',
    computed: {
        total () {
            return this.data.reduce((acc, item) => acc + item.one, 0)
        }
    },
    data () {
        return {
            data: [
                {
                    name: 'Page A', one: 60, two: 10,
                },
            ],
        }
    }
}
</script>