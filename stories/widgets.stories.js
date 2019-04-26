import {
    boolean, select,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/vue'

import {
    WCartesian, WLine, WXAxis, WYAxis, WLegend,
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

storiesOf('Widgets', module)
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
