<template>
    <div class="Container">
        <div class="ChartProps">
            <div class="Zone Space"></div>
            <div class="Zone Gap"></div>
            <div class="Zone Chart"></div>
            <WCartesian
                :dataset="data"
                :gap="30"
                responsive
            >
                <WLine
                    datakey="one"
                    dot
                />
                <WLine
                    datakey="two"
                    dot
                />
                <WXAxis
                    datakey="name"
                    :space="[60, 60, 60, 60]"
                />
                <WYAxis />
                <WTooltip />
            </WCartesian>
        </div>

        <div class="Legends">
            <WLegendItem
                v-for="({ text, color, styles }, index) in legends"
                :key="index"
                :index="index"
                :text="text"
                :color="color"
                :styles="styles"
                active
            >
                <template #bullet="{ color }">
                    <WBullet :styles="{ backgroundColor: color, borderColor: color }" />
                </template>
            </WLegendItem>
        </div>
    </div>
</template>

<script>
import { chart as data } from '../data'

export default {
    name: 'Zones',
    data () {
        return {
            data,
            legends: [
                {
                    text: 'Space axis',
                    color: '#ddd'
                },
                {
                    text: 'Gap',
                    color: '#eee'
                },
            ],
        }
    }
}
</script>
<style lang="scss" scoped>
.Container, .ChartProps {
    position: relative;

    .Zone {
        position: absolute;
    }

    .Space {
        width: 100%;
        height: 100%;
        background: #ddd;
    }

    .Gap {
        top: 60px;
        left: 60px;
        right: 60px;
        bottom: 60px;
        width: calc(100% - 120px);
        height: calc(100% - 120px);
        background: #eee;
    }

    .Chart {
        top: 90px;
        left: 90px;
        right: 90px;
        bottom: 90px;
        width: calc(100% - 180px);
        height: calc(100% - 180px);
        background: white;
    }

    .Legends {
        display: flex;
        justify-content: center;
        margin: 30px;

        a {
            color: #000;

            & + a {
                margin-left: 15px;
            }
        }
    }

    .WCartesian {
        &::v-deep #WXAxis, &::v-deep #WYAxis {
            & > g:first-of-type, & > g:last-of-type {
                text {
                    font-weight: bold;
                }
            }
        }
    }
}
</style>