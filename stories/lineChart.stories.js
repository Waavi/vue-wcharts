import {
    boolean, number, color, select,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/vue'
import { curveStep } from 'd3-shape'

import {
    WCartesian, WLine, WXAxis, WYAxis, WLegend,
} from '../src'

const data = [
    {
        name: 'Page A', one: 10, two: 2400, three: 2400,
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
        name: 'Page G', one: 3490, two: 4300, three: -10,
    },
]

storiesOf('Components/LineChart', module)
    .add('Tiny', () => ({
        components: {
            WCartesian,
            WLine,
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
                        curve
                        datakey="one"
                    />
                </WCartesian>
            </div>
        `,
    }))
    .add('Simple', () => ({
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
    .add('With gradient', () => ({
        components: {
            WCartesian,
            WLine,
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
                <defs>
                    <linearGradient
                        id="color-id"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0"
                            stop-color="#ffeb3b"
                        />
                        <stop
                            offset="0.5"
                            stop-color="#48c0b6"
                        />
                        <stop
                            offset="1"
                            stop-color="#5400e8"
                        />
                    </linearGradient>
                </defs>
                    <WLine
                        curve
                        :styles="{ stroke: 'url(#color-id)', strokeWidth: 2 }"
                        datakey="one"
                    />
                </WCartesian>
            </div>
        `,
    }))
    .add('Curve', () => ({
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
                        curve
                        datakey="one"
                    />
                    <WXAxis
                        datakey="name"
                    />
                    <WYAxis />
                </WCartesian>
            </div>
        `,
    }))
    .add('With custom curve', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
        },
        data () {
            return {
                data,
                curveStep,
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                >
                    <WLine
                        dot
                        :curve="curveStep"
                        datakey="one"
                    />
                    <WXAxis
                        datakey="name"
                    />
                    <WYAxis />
                </WCartesian>
            </div>
        `,
    }))
    .add('With dots', () => ({
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
                        dot
                        datakey="one"
                    />
                    <WXAxis
                        datakey="name"
                    />
                    <WYAxis />
                </WCartesian>
            </div>
        `,
    }))
    .add('With custom dots', () => ({
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
                        dot
                        datakey="one"
                    >
                        <template
                            #dot="{ dot, styles }"
                        >
                            <g
                                :fill="styles.stroke"
                            >
                                <rect
                                    :x="dot.x - 7"
                                    :y="dot.y - 7"
                                    width="14"
                                    height="14"
                                />
                                <text
                                    :x="dot.x"
                                    :y="dot.y"
                                    text-anchor='middle'
                                    dy="-14">
                                    {{ dot.value }}
                                </text>
                            </g>
                        </template>
                    </WLine>
                    <WXAxis
                        datakey="name"
                    />
                    <WYAxis />
                </WCartesian>
            </div>
        `,
    }))
    .add('Responsive', () => ({
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
                    responsive
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
    .add('Legends', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
            WLegend,
        },
        data () {
            return {
                data,
                legendPos: select('Legend - Position', {
                    top: 'top',
                    bottom: 'bottom',
                    left: 'left',
                    right: 'right',
                }, 'bottom'),
                legendAlign: select('Legend - Align', {
                    start: 'start',
                    center: 'center',
                    end: 'end',
                }, 'end'),
                legendSelectable: boolean('Legend - Selectable', true),
            }
        },
        template: `
            <div class="Container">
                <WCartesian :dataset="data" style="padding: 0 8rem 2rem 8rem;">
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
                    <WXAxis datakey="name" :space="[0, 50, 50, 50]" />
                    <WYAxis :space="[50, 0, 0, 50]" />
                    <WLegend
                        :selectable="legendSelectable"
                        :position="legendPos"
                        :align="legendAlign"
                        :containerStyles="{ margin: '1rem 0', padding: '0 50px' }"
                    />
                </WCartesian>
            </div>
            `,
    }))
    .add('With custom legends', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
            WLegend,
        },
        data () {
            return {
                data,
                legendPos: select('Legend - Position', {
                    top: 'top',
                    bottom: 'bottom',
                    left: 'left',
                    right: 'right',
                }, 'bottom'),
                legendAlign: select('Legend - Align', {
                    start: 'start',
                    center: 'center',
                    end: 'end',
                }, 'end'),
                legendSelectable: boolean('Legend - Selectable', true),
                legendBullet: select('Legend - Bullet', {
                    star: '★',
                    phone: '☎',
                    cross: '☩',
                }, '★'),
            }
        },
        template: `
            <div class="Container">
                <WCartesian :dataset="data" style="padding: 0 8rem 2rem 8rem;">
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
                    <WXAxis datakey="name" :space="[0, 50, 50, 50]" />
                    <WYAxis :space="[50, 0, 0, 50]" />
                    <WLegend
                        :selectable="legendSelectable"
                        :position="legendPos"
                        :align="legendAlign"
                        :containerStyles="{ margin: '1rem 0', padding: '0 50px' }"
                    >
                        <template #bullet="{ styles }">
                            <span :style="{ fontSize: '18', marginRight: '10px', color: styles.color }">{{ legendBullet }}</span>
                        </template>
                    </WLegend>
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
            WLegend,
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
                                :x="props.tick.x"
                                :y="props.tick.y"
                                :dy="props.tick.dy"
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
                    />
                </WCartesian>
            </div>
            `,
    }))
