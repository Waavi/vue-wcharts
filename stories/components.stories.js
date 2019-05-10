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
                    values: [67.3, 4.3],
                },
                showValue: boolean('Show value', true),
            }
        },
        template: `
            <div class="Container">
                <WStackBar
                    :values="data.values"
                    :showValue="showValue"
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
                    values: [37.3, 10.3, 23.6],
                },
                showValue: boolean('Show value', true),
                valueStyles: object('Styles values', {
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
                    :values="data.values"
                    :showValue="showValue"
                    :valueStyles="valueStyles"
                >
                    <template #value="{ value, percentage, color }">
                        <span>{{ value }}€ ({{ percentage }})</span>
                    </template>
                </WStackBar>
            </div>
            `,
    }))
