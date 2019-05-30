import {
    boolean, object,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/vue'

import {
    WStackBar,
} from '../src'

storiesOf('Components', module)
    .add('WStackBar', () => ({
        components: {
            WStackBar,
        },
        data () {
            return {
                data: {
                    legends: ['M&R ToEx', 'Unavailability costs'],
                    dataset: [67.3, 4.3],
                },
                showLabel: boolean('Show value', true),
            }
        },
        template: `
            <div class="Container">
                <WStackBar
                    :dataset="data.dataset"
                    :showLabel="showLabel"
                >
                    <template #value="{ value, percentage, color }">
                        <span>{{ value }}</span>
                    </template>
                </WStackBar>
            </div>
            `,
    }))
    .add('WStackBar custom', () => ({
        components: {
            WStackBar,
        },
        data () {
            return {
                data: {
                    total: 71.6,
                    legends: ['M&R ToEx', 'Unavailability costs'],
                    dataset: [37.3, 10.3, 23.6],
                },
                showLabel: boolean('Show label', true),
                labelSstyles: object('Label Styles', {
                    top: '4px',
                    left: '6px',
                    color: 'white',
                }),
            }
        },
        template: `
            <div class="Container">
                <WStackBar
                    :total="data.total"
                    :dataset="data.dataset"
                    :showLabel="showLabel"
                    :labelStyles="labelSstyles"
                >
                    <template #value="{ value, percentage, color }">
                        <span>{{ value }}€ ({{ percentage }})</span>
                    </template>
                </WStackBar>
            </div>
            `,
    }))
