import {
    number, color, select,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/vue'

import {
    WCartesian, WLine, WXAxis, WYAxis, WMarker,
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

storiesOf('Markers', module)
    .add('X Range', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
            WMarker,
        },
        data () {
            const valueXOptions = data.reduce((acc, d) => ({ ...acc, [d.name]: d.name }), {})
            return {
                data,
                styles: {
                    stroke: color('Stroke', '#333'),
                    strokeWidth: number('Stroke Width', 1, {
                        range: true,
                        min: 0,
                        max: 10,
                    }),
                    strokeDasharray: number('Stroke Dasharray', 0, {
                        range: true,
                        min: 0,
                        max: 10,
                    }),
                    fill: color('Fill', 'rgba(0,0,0,0.1)'),
                },
                valueX1: select('X1', valueXOptions, valueXOptions['Page C']),
                valueX2: select('X2', valueXOptions, valueXOptions['Page E']),
                bs1: number('BorderSpacing (index 1) (%)', 50, {
                    range: true,
                    min: 0,
                    max: 100,
                }),
                bs3: number('BorderSpacing (index 3) (%)', 50, {
                    range: true,
                    min: 0,
                    max: 100,
                }),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                >
                    <WLine
                        datakey="one"
                        legend="One Line"
                    />
                    <WMarker
                        :x="[valueX1, valueX2]"
                        :borderSpacing="[0, bs1 / 100, 0, bs3 / 100]"
                        :styles="styles"
                    />
                    <WXAxis datakey="name" />
                    <WYAxis />
                </WCartesian>
            </div>
        `,
    }))
    .add('With custom label', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
            WMarker,
        },
        data () {
            return {
                data,
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                >
                    <WLine
                        datakey="one"
                        legend="One Line"
                    />
                    <WMarker
                        :value="2000"
                        type="y"
                    >
                        <template
                            #default="{ x, y, dy, value }"
                        >
                            <text
                                :x="x"
                                :y="y"
                                :dy="dy"
                                text-anchor="end"
                                :style="{ fontSize: 20, fill: 'tomato' }"
                            >
                                🤔 {{ value }}
                            </text>
                        </template>
                    </WMarker>
                    <WXAxis datakey="name" />
                    <WYAxis />
                </WCartesian>
            </div>
        `,
    }))
