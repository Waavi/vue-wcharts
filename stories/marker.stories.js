import {
    number, color, select, text,
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
    .add('Default', () => ({
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
                },
                labelStyles: {
                    fill: color('Font color', '#333'),
                    fontSize: number('Font size', 14, {
                        range: true,
                        min: 8,
                        max: 25,
                    }),
                },
                labelTextX: text('Marker X', 'Marker X'),
                valueX: select('Value Marker Y', valueXOptions, valueXOptions['Page C']),
                labelTextXAnchor: select('Marker X - Placement', {
                    start: 'start',
                    end: 'end',
                }, 'end'),
                labelTextY: text('Marker Y', 'Marker Y'),
                labelTextYAnchor: select('Marker Y - Placement', {
                    start: 'start',
                    end: 'end',
                }, 'end'),
                valueY: number('Value Marker X', 1500, {
                    range: true,
                    min: 1000,
                    max: 3000,
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
                        :styles="styles"
                        :labelStyles="labelStyles"
                        :value="valueY"
                        :label="labelTextY"
                        :placement="labelTextYAnchor"
                        type="y"
                    />
                    <WMarker
                        :styles="styles"
                        :labelStyles="labelStyles"
                        :value="valueX"
                        :label="labelTextX"
                        :placement="labelTextXAnchor"
                        type="x"
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
                                :style="{ fontSize: 20, fill: 'red' }"
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
