import { storiesOf } from '@storybook/vue'
import { boolean, number, color } from '@storybook/addon-knobs'

import {
    WCartesian, WLine, WXAxis, WYAxis, WLegend,
} from '../src'

storiesOf('Components/LineChart', module)
    .add('Default', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
        },
        data () {
            return {
                data: [
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
                ],
                dataKey: !boolean('Categories', false) ? 'name' : null,
                gap: number('Gap', 0, {
                    range: true,
                    min: 0,
                    max: 75,
                }),
                axisStyles: {
                    stroke: color('Axis color', '#626c91'),
                },
                labelStyles: {
                    fill: color('Font color', '#999'),
                    fontSize: number('Font size', 12, {
                        range: true,
                        min: 8,
                        max: 25,
                    }),
                },
                lineColor: color('Linear color', 'tomato'),
                hideLineX: boolean('Line X - Hide', false),
                hideLineY: boolean('Line Y - Hide', false),
                hideTickMark: boolean('Ticks - Hide', false),
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
                    :bound="[0, n => n + 1000]"
                    :gap="gap"
                >
                    <WLine
                        dot
                        :styles="{ stroke: lineColor }"
                        datakey="one"
                    />
                    <WLine
                        dot
                        curve
                        datakey="two"
                    />
                    <WLine
                        dot
                        datakey="three"
                    />
                    <WXAxis
                        :datakey="dataKey"
                        :hideLine="hideLineX"
                        :hideTickMark="hideTickMark"
                        :axisStyles="axisStyles"
                        :labelStyles="labelStyles"
                        :space="[0, 50, 50, 50]"
                    />
                    <WYAxis
                        :hideLine="hideLineY"
                        :hideTickMark="hideTickMark"
                        :ticksNum="ticksYNum"
                        :axisStyles="axisStyles"
                        :labelStyles="labelStyles"
                        :space="[50, 0, 0, 50]" />
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
                data: [
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
                ],
                dataKey: !boolean('Categories', false) ? 'name' : null,
                gap: number('Gap', 0, {
                    range: true,
                    min: 0,
                    max: 75,
                }),
                axisStyles: {
                    stroke: color('Axis color', '#626c91'),
                },
                labelStyles: {
                    fill: color('Font color', '#999'),
                    fontSize: number('Font size', 12, {
                        range: true,
                        min: 8,
                        max: 25,
                    }),
                },
                lineColor: color('Linear color', 'tomato'),
                hideLineX: boolean('Line X - Hide', false),
                hideLineY: boolean('Line Y - Hide', false),
                hideTickMark: boolean('Ticks - Hide', false),
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
                    :bound="[0, n => n + 1000]"
                    :gap="gap"
                    style="padding: 0 0 2rem 0;"
                >
                    <WLine
                        dot
                        :styles="{ stroke: lineColor }"
                        datakey="one"
                        legend="One Line"
                    />
                    <WLine
                        dot
                        curve
                        datakey="two"
                        legend="Two Line"
                    />
                    <WLine
                        dot
                        datakey="three"
                        legend="Three Line"
                    />
                    <WXAxis
                        :datakey="dataKey"
                        :hideLine="hideLineX"
                        :hideTickMark="hideTickMark"
                        :axisStyles="axisStyles"
                        :labelStyles="labelStyles"
                        :space="[0, 50, 50, 50]"
                    />
                    <WYAxis
                        :hideLine="hideLineY"
                        :hideTickMark="hideTickMark"
                        :ticksNum="ticksYNum"
                        :axisStyles="axisStyles"
                        :labelStyles="labelStyles"
                        :space="[50, 0, 0, 50]" />
                    <WLegend
                        selectable
                        align="end"
                        :containerStyles="{ marginBottom: '1rem', paddingRight: '50px' }"
                    />
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
            WLegend,
        },
        data () {
            return {
                data: [
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
                ],
                dataKey: !boolean('Categories', false) ? 'name' : null,
                gap: number('Gap', 0, {
                    range: true,
                    min: 0,
                    max: 75,
                }),
                axisStyles: {
                    stroke: color('Axis color', '#626c91'),
                },
                labelStyles: {
                    fill: color('Font color', '#999'),
                    fontSize: number('Font size', 12, {
                        range: true,
                        min: 8,
                        max: 25,
                    }),
                },
                lineColor: color('Linear color', 'tomato'),
                hideLineX: boolean('Line X - Hide', false),
                hideLineY: boolean('Line Y - Hide', false),
                hideTickMark: boolean('Ticks - Hide', false),
                ticksYNum: number('Ticks Y - Num', 5, {
                    range: true,
                    min: 2,
                    max: 8,
                }),
            }
        },
        template: `
            <div class="Container" style="
                display: flex;
                flex-grow: 1;
                justify-content: center;
                align-items: center;
                width: 100%;
            ">
                <div class="Wrapper" style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 90%;
                    max-width: 800px;
                ">
                    <WCartesian
                        :dataset="data"
                        :bound="[0, n => n + 1000]"
                        :gap="gap"
                        autoresize
                        style="padding: 0 0 2rem 0;"
                    >
                        <WLine
                            dot
                            :styles="{ stroke: lineColor }"
                            datakey="one"
                            legend="One Line"
                        />
                        <WLine
                            dot
                            curve
                            datakey="two"
                            legend="Two Line"
                        />
                        <WLine
                            dot
                            datakey="three"
                            legend="Three Line"
                        />
                        <WXAxis
                            :datakey="dataKey"
                            :hideLine="hideLineX"
                            :hideTickMark="hideTickMark"
                            :axisStyles="axisStyles"
                            :labelStyles="labelStyles"
                            :space="[0, 50, 50, 50]"
                        />
                        <WYAxis
                            :hideLine="hideLineY"
                            :hideTickMark="hideTickMark"
                            :ticksNum="ticksYNum"
                            :axisStyles="axisStyles"
                            :labelStyles="labelStyles"
                            :space="[50, 0, 0, 50]" />
                        <WLegend
                            selectable
                            align="end"
                            :containerStyles="{ marginBottom: '1rem', paddingRight: '50px' }"
                        />
                    </WCartesian>
                </div>
            </div>
            `,
    }))
    .add('Customize', () => ({
        components: {
            WCartesian,
            WLine,
            WXAxis,
            WYAxis,
        },
        data () {
            return {
                data: [
                    {
                        name: 'Page A', one: 4000, two: 2400, three: 2400,
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
                        name: 'Page E', one: 1890, two: 4800, three: 1700,
                    },
                    {
                        name: 'Page F', one: 2390, two: 3800, three: 2500,
                    },
                    {
                        name: 'Page G', one: 3490, two: 4300, three: 2100,
                    },
                ],
                gap: number('Gap', 20, {
                    range: true,
                    min: 0,
                    max: 75,
                }),
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
                    :bound="[0, n => n + 1000]"
                    :gap="gap"
                >
                    <WLine
                        dot
                        :styles="{ stroke: lineColor }"
                        datakey="one"
                    />
                    <WLine
                        dot
                        curve
                        datakey="two"
                    />
                    <WLine
                        dot
                        datakey="three"
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
                        :space="[50, 0, 0, 50]" />
                </WCartesian>
            </div>
            `,
    }))
