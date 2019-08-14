import { storiesOf } from '@storybook/vue'

import {
    WCartesian, WScatter, WXAxis, WYAxis, WZAxis, WCartesianGrid, WTooltip, WLegend,
} from '../src'

const data = [
    {
        name: 'Page A', one: 4000, two: 2400, three: 2300,
    },
    {
        name: 'Page B', one: 3000, two: 2210, three: 1398,
    },
    {
        name: 'Page C', one: 9800, two: 2200, three: 100,
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
]

storiesOf('Charts/Scatter', module)
    .add('Simple', () => ({
        components: {
            WCartesianGrid,
            WTooltip,
            WCartesian,
            WScatter,
            WXAxis,
            WYAxis,
            WZAxis,
            WLegend,
        },
        data () {
            return {
                data,
            }
        },
        template: `
           <WCartesian
                :dataset="data"
                responsive
                scatter
                :bound="[n => n - 1000,n => n + 1000]"
                :xBound="[n => n - 1000,n => n + 1000]"
            >
                <WCartesianGrid />
                <WScatter legend="One Scatter" />
                <WXAxis
                    name="one"
                    datakey="one"
                    :space="[0, 50, 80, 50]"
                />
                <WYAxis
                    name="two"
                    datakey="two"
                    :space="[25, 0, 0, 50]"
                />
                <WTooltip />
                <WLegend
                    position="top"
                    align="end"
                />
            </WCartesian>
        `,
    }))
    .add('With line', () => ({
        components: {
            WCartesianGrid,
            WTooltip,
            WCartesian,
            WScatter,
            WXAxis,
            WYAxis,
            WZAxis,
            WLegend,
        },
        data () {
            return {
                data,
            }
        },
        template: `
           <WCartesian
                :dataset="data"
                responsive
                scatter
                :bound="[n => n - 1000,n => n + 1000]"
                :xBound="[n => n - 1000,n => n + 1000]"
            >
                <WCartesianGrid />
                <WScatter line legend="One Scatter" />
                <WXAxis
                    name="one"
                    datakey="one"
                    :space="[0, 50, 80, 50]"
                />
                <WYAxis
                    name="two"
                    datakey="two"
                    :space="[25, 0, 0, 50]"
                />
                <WTooltip />
                <WLegend
                    position="top"
                    align="end"
                />
            </WCartesian>
        `,
    }))
    .add('Three Dimensions', () => ({
        components: {
            WCartesianGrid,
            WTooltip,
            WCartesian,
            WScatter,
            WXAxis,
            WYAxis,
            WZAxis,
        },
        data () {
            return {
                data,
            }
        },
        template: `
           <WCartesian
                :dataset="data"
                responsive
                scatter
                :bound="[n => n - 1000,n => n + 1000]"
                :xBound="[n => n - 1000,n => n + 1000]"
            >
                <WCartesianGrid />
                <WScatter />
                <WXAxis
                    name="one"
                    datakey="one"
                    :space="[0, 50, 80, 50]"
                />
                <WYAxis
                    name="two"
                    datakey="two"
                    :space="[25, 0, 0, 50]"
                />
                <WZAxis
                    name="three"
                    datakey="three"
                    :range="[100, 5000]"
                />
                <WTooltip />
            </WCartesian>
        `,
    }))
    .add('Multiple', () => ({
        components: {
            WCartesianGrid,
            WTooltip,
            WCartesian,
            WScatter,
            WXAxis,
            WYAxis,
            WZAxis,
            WLegend,
        },
        data () {
            return {
                data: {
                    one: data,
                    two: [
                        {
                            name: 'Page A', one: 4000, two: 1400, three: 300,
                        },
                        {
                            name: 'Page B', one: 2000, two: 6210, three: 1398,
                        },
                        {
                            name: 'Page C', one: 2800, two: 8200, three: 100,
                        },
                    ],
                },
            }
        },
        template: `
           <WCartesian
                :dataset="data"
                responsive
                scatter
                :bound="[n => n - 1000,n => n + 1000]"
                :xBound="[n => n - 1000,n => n + 1000]"
            >
                <WCartesianGrid />
                <WScatter line datakey="one" legend="One Scatter" />
                <WScatter line datakey="two" legend="Two Scatter" />
                <WXAxis
                    name="one"
                    datakey="one"
                    :space="[0, 50, 80, 50]"
                />
                <WYAxis
                    name="two"
                    datakey="two"
                    :space="[25, 0, 0, 50]"
                />
                <WTooltip />
                <WLegend
                    position="top"
                    align="end"
                    selectable
                />
            </WCartesian>
        `,
    }))
