import {
    boolean, number, color, select, text,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/vue'

import {
    WCartesian, WLine, WXAxis, WYAxis,
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

storiesOf('Axis', module)
    .add('Default', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
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
                    />
                    <WLine
                        datakey="two"
                    />
                    <WLine
                        datakey="three"
                    />
                    <WXAxis
                        datakey="name"
                    />
                    <WYAxis />
                </WCartesian>
            </div>
        `,
    }))
    .add('With custom axis', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
        },
        data () {
            return {
                data,
                axisStyles: {
                    stroke: color('Axis color', '#626c91'),
                },
                labelStyles: {
                    fill: color('Font color', '#008BCD'),
                    fontSize: number('Font size', 12, {
                        range: true,
                        min: 8,
                        max: 25,
                    }),
                },
                lineColor: color('Linear color', '#FF7500'),
                hideLineX: boolean('Line X - Hide', true),
                hideLineY: boolean('Line Y - Hide', true),
                hideTickMark: boolean('Ticks - Hide', true),
                ticksYNum: number('Ticks Y - Num', 5, {
                    range: true,
                    min: 2,
                    max: 8,
                }),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                >
                    <WLine
                        curve
                        datakey="one"
                    />
                    <WXAxis
                        datakey="name"
                        :hideLine="hideLineX"
                        :hideTickMark="hideTickMark"
                        :axisStyles="axisStyles"
                        :labelStyles="labelStyles"
                        :space="[0, 50, 50, 50]"
                    >
                        <template #tickText="props">
                            <text
                                :x="props.x"
                                :y="props.y"
                                :dy="props.dy"
                            >
                                🤔
                            </text>
                        </template>
                    </WXAxis>
                    <WYAxis
                        :ticksNum="ticksYNum"
                        :hideLine="hideLineY"
                        :hideTickMark="hideTickMark"
                        :axisStyles="axisStyles"
                        :labelStyles="labelStyles"
                        :space="[50, 0, 0, 50]"
                        :format="v => '@' + v"
                    />
                </WCartesian>
            </div>
            `,
    }))
    .add('Label', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
        },
        data () {
            return {
                data,
                labelTextX: text('Label X', 'Categories'),
                labelTextXAnchor: select('Label X - Text anchor', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'end'),
                labelTextY: text('Label Y', 'Values'),
                labelTextYAnchor: select('Label Y - Text anchor', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                >
                    <WLine
                        datakey="one"
                    />
                    <WLine
                        datakey="two"
                    />
                    <WLine
                        datakey="three"
                    />
                    <WXAxis
                        datakey="name"
                        :labelText="labelTextX"
                        :labelAlign="labelTextXAnchor"
                    />
                    <WYAxis :labelText="labelTextY" :labelAlign="labelTextYAnchor" />
                </WCartesian>
            </div>
        `,
    }))
    .add('With custom labels', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
        },
        data () {
            return {
                data,
                labelTextX: text('Label X', '🤔 Pages'),
                labelTextXAnchor: select('Label X - Text anchor', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'end'),
                labelTextY: text('Label Y', 'Values'),
                labelTextYAnchor: select('Label Y - Text anchor', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
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
                    <WLine
                        datakey="two"
                        legend="Two Line"
                    />
                    <WLine
                        datakey="three"
                        legend="Three Line"
                    />
                    <WXAxis
                        datakey="name"
                        :space="[0, 50, 80, 50]"
                        :labelAlign="labelTextXAnchor"
                    >
                        <template #label="label">
                            <svg
                                width="100%"
                                height="100%"
                            >
                                <text
                                    :x="label.x"
                                    :y="label.y"
                                    :text-anchor="label.textAnchor"
                                    :transform="label.transform"
                                    :font-size="14"
                                    fill="DarkOrange"
                                >
                                    {{ labelTextX }}
                                </text>
                            </svg>
                        </template>
                    </WXAxis>
                    <WYAxis
                        :space="[50, 0, 0, 100]"
                        :labelAlign="labelTextYAnchor"
                    >
                        <template #label="label">
                            <svg
                                width="100%"
                                height="100%"
                            >
                                <text
                                    :x="label.x"
                                    :y="label.y"
                                    :text-anchor="label.textAnchor"
                                    :transform="label.transform"
                                    :font-size="18"
                                    fill="SteelBlue"
                                >
                                    {{ labelTextY }}
                                </text>
                            </svg>
                        </template>
                    </WYAxis>
                </WCartesian>
            </div>
        `,
    }))
