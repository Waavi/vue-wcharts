import {
    boolean, number, object, select,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/vue'

import {
    WCartesian, WLine, WBar, WXAxis, WYAxis, WTooltip, WLegend,
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

storiesOf('Charts/Bar', module)
    .add('Tiny', () => ({
        components: {
            WCartesian,
            WBar,
            WLine,
            WXAxis,
            WYAxis,
            WLegend,
            WTooltip,
        },
        data () {
            return {
                key: select('Data Key', {
                    one: 'one',
                    two: 'two',
                    three: 'three',
                }, 'one'),
                showLabel: boolean('Show label', false),
                labelPosition: select('Label position', {
                    inside: 'inside',
                    outside: 'outside',
                }, 'outside'),
                width: number('Bar width', 30),
                data: object('Data', data),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                    responsive
                    :bound="[0]"
                >
                    <WBar
                        :datakey="key"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :width="width"
                    />
                    <WXAxis
                        datakey="name"
                        :space="[0, 50, 80, 50]"
                    />
                    <WYAxis :space="[25, 0, 0, 50]" />
                </WCartesian>
            </div>
        `,
    }))
    .add('Simple', () => ({
        components: {
            WCartesian,
            WBar,
            WLine,
            WXAxis,
            WYAxis,
            WLegend,
            WTooltip,
        },
        data () {
            return {
                key: select('Data Key', {
                    one: 'one',
                    two: 'two',
                    three: 'three',
                }, 'one'),
                showLabel: boolean('Show label', true),
                labelPosition: select('Label position', {
                    inside: 'inside',
                    outside: 'outside',
                }, 'outside'),
                labelTextAnchor: select('Label text-anchor', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
                width: 30,
                data: object('Data', data),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                    responsive
                >
                    <WBar
                        legend="One Bar"
                        datakey="one"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelTextAnchor="labelTextAnchor"
                        :width="width"
                    />
                    <WBar
                        datakey="two"
                        legend="Two Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelTextAnchor="labelTextAnchor"
                        :width="width"
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelTextAnchor="labelTextAnchor"
                        :width="width"
                    />
                    <WLine
                        datakey="two"
                        legend="One Line"
                    />
                    <WXAxis
                        datakey="name"
                        :space="[0, 50, 80, 50]"
                    />
                    <WYAxis :space="[25, 0, 0, 50]" />
                    <WLegend
                        selectable
                    />
                    <WTooltip />
                </WCartesian>
            </div>
        `,
    }))
    .add('With custom label', () => ({
        components: {
            WCartesian,
            WBar,
            WLine,
            WXAxis,
            WYAxis,
            WLegend,
            WTooltip,
        },
        data () {
            return {
                key: select('Data Key', {
                    one: 'one',
                    two: 'two',
                    three: 'three',
                }, 'one'),
                showLabel: boolean('Show label', true),
                labelPosition: select('Label position', {
                    inside: 'inside',
                    outside: 'outside',
                }, 'outside'),
                labelTextAnchor: select('Label text-anchor', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
                width: 30,
                data: object('Data', data),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                    responsive
                    :bound="[0]"
                >
                    <WLine
                        datakey="two"
                        area
                        legend="One Line"
                    />
                    <WBar
                        legend="One Bar"
                        datakey="one"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelTextAnchor="labelTextAnchor"
                        :width="width"
                    >
                        <template #label="label">
                            <text
                                :x="label.x"
                                :y="0"
                                :font-size="12"
                                text-anchor="middle"
                                fill="DarkOrange"
                                :style="{ transform: \`translateY(\${label.y}px)\` }"
                            >
                                {{ label.value }}
                            </text>
                        </template>
                    </WBar>
                    <WBar
                        datakey="two"
                        legend="Two Bar"
                        :showLabel="showLabel"
                        labelPosition="inside"
                        :labelStyles="{ fill: '#eee' }"
                        :width="width"
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelTextAnchor="labelTextAnchor"
                        :width="width"
                    >
                        <template #label="label">
                            <text
                                :x="label.x"
                                :y="0"
                                :font-size="12"
                                text-anchor="middle"
                                :style="{ transform: \`translateY(\${label.y}px)\` }"
                            >
                                {{ label.value <= 0 ? '🤔' : label.value }}
                            </text>
                        </template>
                    </WBar>
                    <WXAxis
                        datakey="name"
                        :space="[0, 50, 80, 50]"
                    />
                    <WYAxis :space="[25, 0, 0, 50]" />
                    <WLegend
                        selectable
                    />
                    <WTooltip />
                </WCartesian>
            </div>
        `,
    }))