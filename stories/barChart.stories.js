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

const dataTwo = [
    {
        name: 'Page A', one: 3000, two: 1400, three: 400, four: 1400,
    },
    {
        name: 'Page B', one: 2000, two: 2398, three: 1210, four: 110,
    },
    {
        name: 'Page C', one: 10, two: 8800, three: 1290, four: 22290,
    },
    {
        name: 'Page D', one: 1780, two: 1908, three: 2000, four: 24000,
    },
    {
        name: 'Page E', one: 4890, two: 8800, three: 5700, four: 21700,
    },
    {
        name: 'Page F', one: 5390, two: 6800, three: 7500, four: 16500,
    },
    {
        name: 'Page G', one: 8490, two: 6300, three: 6100, four: 18000,
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
                width: number('Bar width', 45),
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
    .add('Three bars', () => ({
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
                labelAlign: select('Label align', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
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
                        :labelAlign="labelAlign"
                    />
                    <WBar
                        datakey="two"
                        legend="Two Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
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
    .add('With line', () => ({
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
                labelAlign: select('Label align', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
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
                        :labelAlign="labelAlign"
                    />
                    <WBar
                        datakey="two"
                        legend="Two Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
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
                labelAlign: select('Label align', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
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
                        :labelAlign="labelAlign"
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
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
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
    .add('Multiple colors', () => ({
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
                width: 25,
                data: object('Data', data),
                showLabel: boolean('Show label', true),
                labelPosition: select('Label position', {
                    inside: 'inside',
                    outside: 'outside',
                }, 'outside'),
                labelAlign: select('Label align', {
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
                    responsive
                >
                    <WBar
                        legend="One Bar"
                        datakey="one"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
                        :width="width"
                        :color="['#111', '#222', '#333', '#444', '#555', '#666', '#777']"
                    />
                    <WBar
                        datakey="two"
                        legend="Two Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
                        :width="width"
                        :color="['#111', '#222', '#333', '#444', '#555', '#666', '#777']"
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
                        :width="width"
                        :color="['#111', '#222', '#333', '#444', '#555', '#666', '#777']"
                    />
                    <WXAxis
                        datakey="name"
                        :space="[0, 50, 80, 50]"
                    />
                    <WYAxis :space="[25, 0, 0, 50]" />
                    <WLegend
                        selectable
                        :colors="['#111', '#222', '#333', '#444', '#555', '#666', '#777']"
                    />
                    <WTooltip />
                </WCartesian>
            </div>
        `,
    }))
    .add('Stacked', () => ({
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
                labelAlign: select('Label align', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
                data: object('Data', dataTwo),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                    responsive
                    stacked
                    :bound="[0]"
                >
                    <WBar
                        legend="One Bar"
                        datakey="one"
                        :showLabel="showLabel"
                        :labelAlign="labelAlign"
                    />
                    <WBar
                        datakey="two"
                        legend="Two Bar"
                        :showLabel="showLabel"
                        :labelAlign="labelAlign"
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showLabel="showLabel"
                        :labelAlign="labelAlign"
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
    .add('Stacked with stacked label', () => ({
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
                showStackedLabel: boolean('Show stacked label', true),
                data: object('Data', dataTwo),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                    :bound="[0]"
                    responsive
                    stacked
                >
                    <WBar
                        legend="One Bar"
                        datakey="one"
                    />
                    <WBar
                        datakey="two"
                        legend="Two Bar"
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showStackedLabel="showStackedLabel"
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
    .add('Stacked with custom stacked label', () => ({
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
                showStackedLabel: boolean('Show stacked label', true),
                stackedLabelSize: select('Stacked Label Size', {
                    8: 8,
                    12: 12,
                    16: 16,
                }, 16),
                stackedLabelAlign: select('Stacked Label Align', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
                data: object('Data', dataTwo),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                    :bound="[0]"
                    responsive
                    stacked
                >
                    <WBar
                        legend="One Bar"
                        datakey="one"
                    />
                    <WBar
                        datakey="two"
                        legend="Two Bar"
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showStackedLabel="showStackedLabel"
                        :stackedLabelSize="stackedLabelSize"
                        :stackedLabelAlign="stackedLabelAlign"
                        :stackedLabelStyles="{ fill: 'black' }"
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
    .add('Stacked with line', () => ({
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
                labelAlign: select('Label align', {
                    start: 'start',
                    middle: 'middle',
                    end: 'end',
                }, 'middle'),
                data: object('Data', dataTwo),
            }
        },
        template: `
            <div class="Container">
                <WCartesian
                    :dataset="data"
                    :bound="[0]"
                    responsive
                    stacked
                >
                    <WBar
                        legend="One Bar"
                        datakey="one"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
                    />
                    <WBar
                        datakey="two"
                        legend="Two Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
                    />
                    <WBar
                        datakey="three"
                        legend="Three Bar"
                        :showLabel="showLabel"
                        :labelPosition="labelPosition"
                        :labelAlign="labelAlign"
                    />
                    <WLine datakey="four" dot />
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
