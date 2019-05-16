import {
    boolean, number, color, select, text,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/vue'

import {
    WPieChart,
    WPie,
} from '../src'

const data = [
    {
        name: 'Page A', one: 1000, two: 2400, three: 2400,
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
]

storiesOf('Pie', module)
    .add('Default', () => ({
        components: {
            WPieChart,
            WPie,
        },
        data () {
            return {
                data,
                stroke: color('Stroke color', '#FFF'),
            }
        },
        template: `
            <div class="Container">
                <WPieChart
                    :dataset="data"
                >
                    <WPie datakey="one" :stroke="stroke"/>
                    <WTooltip />
                </WPieChart>
            </div>
        `,
    }))
    .add('Custom', () => ({
        components: {
            WPieChart,
            WPie,
        },
        data () {
            return {
                data,
                total: data.reduce((acc, item) => acc + item.one, 0),
                styles: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                },
                stroke: color('Stroke color', 'black'),
            }
        },
        template: `
            <div class="Container">
                <WPieChart
                    :dataset="data"
                >
                    <WPie
                        datakey="one"
                        :radius="[120, 150]"
                        :stroke="stroke"
                    >
                        <template>
                            <div class="WPieContent" :style="styles">
                                <span style="font-size: 20px; text-align: center;">
                                    {{ total }}<br>Total
                                </span>
                            </div>
                        </template>
                    </WPie>
                    <WTooltip />
                </WPieChart>
            </div>
            `,
    }))