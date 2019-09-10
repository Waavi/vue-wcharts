<template>
    <WPieChart
        :dataset="data"
    >
        <WPie
            datakey="one"
            :radius="[110, 150]"
            :styles="{ stroke: '#FFF', strokeWidth: 10 }"
        >
            <template>
                <div
                    class="WPieContent"
                    :style="{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }"
                    >
                    <span
                        :style="{
                            fontSize: '20px',
                            textAlign: 'center',
                            color: '#888',
                        }"
                    >
                        {{ total }} €
                        <span :style="{
                            display: 'block',
                            marginTop: '5px',
                            fontWeight: 'bold',
                        }">Total</span>
                    </span>
                </div>
            </template>
        </WPie>
        <WTooltip />
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
                    name: 'Page A', one: 1000, two: 2000, three: 2400,
                },
                {
                    name: 'Page B', one: 3000, two: 1398, three: 2210,
                },
                {
                    name: 'Page C', one: 2000, two: 9800, three: 2290,
                },
                {
                    name: 'Page D', one: 2780, two: 3908, three: 2000,
                },
                {
                    name: 'Page E', one: 1890, two: 0, three: 1700,
                },
                {
                    name: 'Page F', one: 2390, two: 3800, three: 2500,
                },
                {
                    name: 'Page G', one: 3490, two: 4300, three: -1000,
                },
            ],
        }
    }
}
</script>