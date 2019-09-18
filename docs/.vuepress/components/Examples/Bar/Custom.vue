<template>
    <WCartesian
        :dataset="data"
        :height="300"
        :colors="colors"
        :bound="[0]"
        :gap="[0, 0, 10, 0]"
        responsive
    >
        <WBar
            datakey="one"
            :borderRadius="5"
            legend="One Bar"
        />
        <WBar
            datakey="two"
            :borderRadius="5"
            legend="Two Bar"
        />
        <WBar
            datakey="three"
            :borderRadius="5"
            legend="Three Bar"
        />
        <WBar
            datakey="four"
            :borderRadius="5"
            legend="Other"
        />
        <WXAxis
            datakey="name"
            hideLine
            hideTickMark
            :space="[50, 50, 50, 50]"
            :tickStyles="styles.axis.tickStyles"
        />
        <WLegend
            position="top"
            align="center"
            selectable
            :legendStyles="styles.legend.legend"
        >
            <template #bullet="{ color }">
                <WBullet :styles="{ backgroundColor: color, borderColor: color }" />
            </template>
        </WLegend>

        <WTooltip
            :styles="styles.tooltip.styles"
            :titleStyles="styles.tooltip.titleStyles"
        >
            <template #bullet="{ color }">
                <WBullet :styles="{ backgroundColor: color, borderColor: color }" />
            </template>

            <template #value="{ value }">
                <span>{{ value }} €</span>
            </template>
        </WTooltip>
    </WCartesian>
</template>

<script>
export default {
    name: 'Custom',
    data () {
        return {
            colors: [
                '#0da7ba',
                '#5c6bc0',
                '#fb499d',
                '#d8d8d8',
            ],
            data: [
                {
                    name: 'Page A', one: 1800, two: 2000, three: 2400, four: 1500,
                },
                {
                    name: 'Page B', one: 3000, two: 1398, three: 2210, four: 900,
                },
                {
                    name: 'Page C', one: 2000, two: 5800, three: 2290, four: 1800,
                },
                {
                    name: 'Page D', one: 2780, two: 3908, three: 2000, four: 1350,
                },
                {
                    name: 'Page E', one: 1890, two: 2500, three: 1700, four: 1000,
                },
            ],
            styles: {
                legend: {
                    legend: {
                        fontFamily: 'Montserrat',
                        color: '#444',
                    }
                },
                axis: {
                    tickStyles: {
                        fontFamily: 'Montserrat',
                    }
                },
                tooltip: {
                    styles: {
                        background: '#444',
                        color: '#FFF'
                    },
                    titleStyles: {
                        fontWeight: '600',
                    }
                }
            }
        }
    }
}
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
</style>