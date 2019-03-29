import { configure, addDecorator, addParameters } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import '@storybook/addon-console'

import './story.scss'

const req = require.context('@/', true, /.stories.js$/)

function loadStories () {
    req.keys().forEach(filename => req(filename))
}

addParameters({
    options: {
        theme: {
            brandTitle: 'WAAVI',
            brandUrl: 'https://waavi.com',
            brandImage: 'https://i.imgur.com/B5rSlPn.png',
        },
        // Doc: https://github.com/storybooks/storybook/tree/master/addons/options
        addonPanelInRight: true,
    },
    // Doc: https://github.com/storybooks/storybook/tree/master/addons/backgrounds
    backgrounds: [
        { name: 'Dark Mode', value: '#333333' },
        { name: 'Gray Mode', value: '#e1e1e1' },
    ],
})

addDecorator(withInfo({}))
addDecorator(withKnobs)

configure(loadStories, module)
