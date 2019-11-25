<template>
    <WPieChart
        :dataset="chart"
        responsive
    >
        <WGauge
            datakey="one"
            borderRadius="8"
            :startAngle="180"
            :endAngle="0"
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
                        paddingTop: '60px',
                        textAlign: 'center',
                        fontSize: '16px',
                        color: '#000',
                    }"
                >
                    60 %
                    <span
                        :style="{
                            display: 'block',
                            marginTop: '5px',
                            fontSize: '12px',
                        }"
                    >Total</span>
                </span>
            </div>
        </WGauge>
    </WPieChart>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'Pie',
    props: {
        data: VueTypes.any,
    },
    data () {
        return {
            chart: [
                {
                    name: 'Page A', one: 60, total: 100,
                },
            ],
        }
    },
}
</script>
