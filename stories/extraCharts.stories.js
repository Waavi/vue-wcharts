import {
    boolean, object,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/vue'

import {
    WSimpleHStackBar,
} from '../src'

storiesOf('Extra Charts', module)
    .add('WSimpleHStackBar', () => ({
        components: {
            WSimpleHStackBar,
        },
        data () {
            return {
                legends: ['M&R ToEx', 'Unavailability costs'],
                dataset: [67.3, 4.3],
                showLabel: boolean('Show value', true),
            }
        },
        template: `
            <div class="Container">
                <WSimpleHStackBar
                    :dataset="dataset"
                    :showLabel="showLabel"
                >
                    <template #value="{ value, percentage, color }">
                        <span>{{ value }}</span>
                    </template>
                </WSimpleHStackBar>
            </div>
            `,
    }))
    .add('WSimpleHStackBar custom', () => ({
        components: {
            WSimpleHStackBar,
        },
        data () {
            return {
                total: 71.6,
                legends: ['M&R ToEx', 'Unavailability costs'],
                dataset: [37.3, 10.3, 23.6],
                showLabel: boolean('Show label', true),
                labelStyles: object('Label Styles', {
                    top: '4px',
                    left: '6px',
                    color: 'white',
                }),
            }
        },
        template: `
            <div class="Container">
                <WSimpleHStackBar
                    :total="total"
                    :dataset="dataset"
                    :showLabel="showLabel"
                    :labelStyles="labelStyles"
                >
                    <template #value="{ value, percentage, color }">
                        <span>{{ value }}€ ({{ percentage }})</span>
                    </template>
                </WSimpleHStackBar>
            </div>
            `,
    }))
    .add('WSimpleHStackBar with markers', () => ({
        components: {
            WSimpleHStackBar,
        },
        data () {
            return {
                total: 71.6,
                legends: ['M&R ToEx', 'Unavailability costs'],
                dataset: [37.3, 10.3, 23.6],
                markers: [13.3, 18],
                showLabel: boolean('Show label', true),
                labelStyles: object('Label Styles', {
                    top: '4px',
                    left: '6px',
                    color: 'white',
                }),
            }
        },
        template: `
            <div class="Container">
                <WSimpleHStackBar
                    :total="total"
                    :dataset="dataset"
                    :markers="markers"
                    :showLabel="showLabel"
                    :labelStyles="labelStyles"
                >
                    <template #value="{ value, percentage, color }">
                        <span>{{ value }}€ ({{ percentage }})</span>
                    </template>
                </WSimpleHStackBar>
            </div>
            `,
    }))
    .add('WSimpleHStackBar with custom markers', () => ({
        components: {
            WSimpleHStackBar,
        },
        data () {
            return {
                total: 71.6,
                legends: ['M&R ToEx', 'Unavailability costs'],
                dataset: [37.3, 10.3, 23.6],
                markers: [13.3, 18],
                showLabel: boolean('Show label', true),
                labelStyles: object('Label Styles', {
                    top: '4px',
                    left: '6px',
                    color: 'white',
                }),
                markerStyles: object('Label Styles', {
                    transform: 'rotate(0)',
                    height: '100%',
                    border: '0',
                    outline: 'none',
                    background: 'tomato',
                }),
            }
        },
        template: `
            <div class="Container">
                <WSimpleHStackBar
                    :total="total"
                    :dataset="dataset"
                    :markers="markers"
                    :showLabel="showLabel"
                    :labelStyles="labelStyles"
                    :markerStyles="markerStyles"
                >
                    <template #value="{ value, percentage, color }">
                        <span>{{ value }}€ ({{ percentage }})</span>
                    </template>
                </WSimpleHStackBar>
            </div>
            `,
    }))
