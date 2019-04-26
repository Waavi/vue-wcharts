import {
    boolean, number, color, select, text,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/vue'
import { curveStep } from 'd3-shape'

import {
    WCartesian, WLine, WXAxis, WYAxis, WLegend, WCartesianGrid, WTooltip,
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
    .add('With bounds and gap', () => ({
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
                    :bound="[-1000, n => n + 1000]"
                    :dataset="data"
                    :gap="25"
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
                    <WYAxis :space="[0, 0, 0, 50]" />
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
            WTooltip,
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
                            #dot="{ dot, styles, Cartesian, transition }"
                        >
                            <g
                                :fill="styles.stroke"
                            >
                                <rect
                                    :x="Cartesian.active.el && Cartesian.active.el.id === dot.cartesianIndex && Cartesian.active.el.point === dot.index ? dot.x - 10 : dot.x - 7"
                                    :y="Cartesian.active.el && Cartesian.active.el.id === dot.cartesianIndex && Cartesian.active.el.point === dot.index ? dot.y - 10 : dot.y - 7"
                                    :width="Cartesian.active.el && Cartesian.active.el.id === dot.cartesianIndex && Cartesian.active.el.point === dot.index ? 20 : 14"
                                    :height="Cartesian.active.el && Cartesian.active.el.id === dot.cartesianIndex && Cartesian.active.el.point === dot.index ? 20 : 14"
                                    @mouseenter="Cartesian.setActive({ id: dot.cartesianIndex, point: dot.index }, $event, Cartesian.active.types.point)"
                                    @mouseleave="Cartesian.cleanActive"
                                    :style="{ transition }"
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
                    <WTooltip />
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
                }, 'top'),
                legendAlign: select('Legend - Align', {
                    start: 'start',
                    center: 'center',
                    end: 'end',
                }, 'center'),
                legendSelectable: boolean('Legend - Selectable', true),
            }
        },
        template: `
            <div class="Container">
                <WCartesian :dataset="data">
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
                        :space="[0, 50, 25, 50]"
                    />
                    <WYAxis :space="[25, 0, 0, 50]" />
                    <WLegend
                        :selectable="legendSelectable"
                        :position="legendPos"
                        :align="legendAlign"
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
                }, 'left'),
                legendAlign: select('Legend - Align', {
                    start: 'start',
                    center: 'center',
                    end: 'end',
                }, 'center'),
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
                <WCartesian :dataset="data">
                    <WLine
                        datakey="one"
                        legend="Lorem ipsum dolor sit amet consectetur adipisicing"
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
                        :space="[0, 50, 25, 50]"
                    />
                    <WYAxis :space="[25, 0, 0, 50]" />
                    <WLegend
                        :selectable="legendSelectable"
                        :position="legendPos"
                        :align="legendAlign"
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
    .add('Area', () => ({
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
                        area
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
    .add('Area with gradient', () => ({
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
                        y1="1"
                        x2="0"
                        y2="0"
                    >
                        <stop
                            offset="0%"
                            stop-color="#ffeb3b"
                            stop-opacity="0.6"
                        />
                        <stop
                            offset="30%"
                            stop-color="#48c0b6"
                            stop-opacity="0.4"
                        />
                        <stop
                            offset="100%"
                            stop-color="#5400e8"
                            stop-opacity="0.2"
                        />
                    </linearGradient>
                </defs>
                    <WLine
                        area
                        curve
                        datakey="one"
                        :styles="{ stroke: '#5400e8',fill: 'url(#color-id)' }"
                    />
                </WCartesian>
            </div>
        `,
    }))
    .add('Grid', () => ({
        components: {
            WCartesian,
            WLine,
            WCartesianGrid,
            WXAxis,
            WYAxis,
        },
        data () {
            return {
                data,
                styles: {
                    stroke: color('Stroke', '#cccccc'),
                    strokeWidth: number('Stroke Width', 1, {
                        range: true,
                        min: 0,
                        max: 10,
                    }),
                    strokeDasharray: number('Stroke Dasharray', 3, {
                        range: true,
                        min: 0,
                        max: 10,
                    }),
                },
                // labelStyles: {
                //     fill: color('Font color', '#008BCD'),
                //     fontSize: number('Font size', 12, {
                //         range: true,
                //         min: 8,
                //         max: 25,
                //     }),
                // },
                hideH: boolean('Hide Horizontal Lines', false),
                hideV: boolean('Hide Vertical Lines', false),
                numLinesH: number('Number of Horizontal Lines', 0, {
                    range: true,
                    min: 0,
                    max: 100,
                }),
                numLinesV: number('Number of Vertical Lines', 0, {
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
                    />
                    <WXAxis
                        datakey="name"
                    />
                    <WCartesianGrid
                        :numLinesH="numLinesH"
                        :numLinesV="numLinesV"
                        :hideH="hideH"
                        :hideV="hideV"
                        :styles="styles"
                    />
                    <WYAxis />
                </WCartesian>
            </div>
        `,
    }))
    .add('Label Axis', () => ({
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
                        :labelTextAnchor="labelTextXAnchor"
                    />
                    <WYAxis :labelText="labelTextY" :labelTextAnchor="labelTextYAnchor" />
                </WCartesian>
            </div>
        `,
    }))
    .add('With custom label axis', () => ({
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
                        :space="[0, 50, 50, 50]"
                        :labelTextAnchor="labelTextXAnchor"
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
                                    fill="tomato"
                                    font-family="monospace"
                                >
                                    {{ labelTextX }}
                                </text>
                            </svg>
                        </template>
                    </WXAxis>
                    <WYAxis
                        :space="[50, 0, 0, 100]"
                        :labelTextAnchor="labelTextYAnchor"
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
                                    :font-size="20"
                                    fill="blue"
                                >
                                    {{ labelTextY }}
                                </text>
                            </svg>
                        </template>
                    </WYAxis>
                    <WLegend
                        position="bottom"
                        align="center"
                        selectable
                    />
                </WCartesian>
            </div>
        `,
    }))
    .add('Tooltip', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
            WTooltip,
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
                    <WTooltip />
                </WCartesian>
            </div>
        `,
    }))
    .add('With custom tooltip', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
            WTooltip,
        },
        data () {
            return {
                data,
                styles: {
                    background: '#eee',
                },
                labelStyle: {
                    color: '#333',
                    fontSize: '12px',
                },
                lineStyle: {
                    height: '2px',
                    width: '50px',
                    marginTop: '5px',
                    marginBottom: '5px',
                },
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
                    <WLine
                        dot
                        datakey="two"
                        legend="Two Line"
                    />
                    <WXAxis
                        datakey="name"
                    />
                    <WYAxis />
                    <WTooltip :style="styles">
                        <template #default="tooltip">
                            <div class="Wrapper">
                                <div :style="labelStyle"><strong>Category</strong>: {{ tooltip.xAxisVal }}</div>
                                <div :style="labelStyle"><strong>Point</strong>: {{ tooltip.yAxisVal }}</div>
                                <div :style="{ ...lineStyle, background: tooltip.color }"></div>
                            </div>
                        </template>
                    </WTooltip>
                </WCartesian>
            </div>
        `,
    }))
    .add('With custom dot in tooltip', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
            WTooltip,
        },
        data () {
            return {
                data,
                styles: {
                    background: '#eee',
                },
                labelStyle: {
                    color: '#333',
                    fontSize: '12px',
                },
                lineStyle: {
                    height: '2px',
                    width: '50px',
                    marginTop: '5px',
                    marginBottom: '5px',
                },
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
                    <WLine
                        dot
                        datakey="two"
                        legend="Two Line"
                    />
                    <WXAxis
                        datakey="name"
                    />
                    <WYAxis />
                    <WTooltip>
                        <template #bullet="selected">
                            <span :style="{ color: selected.color, marginRight: '5px' }">x</span>
                        </template>
                    </WTooltip>
                </WCartesian>
            </div>
        `,
    }))
