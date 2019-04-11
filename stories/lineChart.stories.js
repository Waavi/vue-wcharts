import { storiesOf } from '@storybook/vue'
import { boolean, number, color } from '@storybook/addon-knobs'

import {
    WCartesian, WLine, WXAxis, WYAxis,
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
                fontSize: number('Font size', 12, {
                    range: true,
                    min: 8,
                    max: 25,
                }),
                fontColor: color('Font color', '#999'),
                stroke: color('Axis color', '#626c91'),
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
                        :stroke="stroke"
                        :fontColor="fontColor"
                        :fontSize="fontSize"
                        :space="[0, 50, 50, 50]"
                    />
                    <WYAxis
                        :hideLine="hideLineY"
                        :ticksNum="ticksYNum"
                        :hideTickMark="hideTickMark"
                        :stroke="stroke"
                        :fontColor="fontColor"
                        :fontSize="fontSize"
                        :space="[50, 0, 0, 50]" />
                </WCartesian>
            </div>
            `,
    }))
    .add('Without categories', () => ({
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
                fontSize: number('Font size', 12, {
                    range: true,
                    min: 8,
                    max: 25,
                }),
                fontColor: color('Font color', '#999'),
                stroke: color('Axis color', '#626c91'),
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
                        :hideLine="hideLineX"
                        :hideTickMark="hideTickMark"
                        :stroke="stroke"
                        :fontColor="fontColor"
                        :fontSize="fontSize"
                        :space="[0, 50, 50, 50]"
                    />
                    <WYAxis
                        :hideLine="hideLineY"
                        :ticksNum="ticksYNum"
                        :hideTickMark="hideTickMark"
                        :stroke="stroke"
                        :fontColor="fontColor"
                        :fontSize="fontSize"
                        :space="[50, 0, 0, 50]" />
                </WCartesian>
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
                fontSize: number('Font size', 12, {
                    range: true,
                    min: 8,
                    max: 25,
                }),
                fontColor: color('Font color', '#E63422'),
                stroke: color('Axis color', '#626c91'),
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
                        :stroke="stroke"
                        :fontColor="fontColor"
                        :fontSize="fontSize"
                        :space="[0, 50, 50, 50]"
                    >
                        <template #tickText="props">
                            <text
                                :x="props.tick.x"
                                :y="props.tick.y"
                                :dy="props.tick.dy"
                                :fill="fontColor"
                                :font-size="fontSize"
                            >
                                🤔
                            </text>
                        </template>
                    </WXAxis>
                    <WYAxis
                        :ticksNum="ticksYNum"
                        :hideLine="hideLineY"
                        :hideTickMark="hideTickMark"
                        :stroke="stroke"
                        :fontColor="fontColor"
                        :fontSize="fontSize"
                        :space="[50, 0, 0, 50]" />
                </WCartesian>
            </div>
            `,
    }))
