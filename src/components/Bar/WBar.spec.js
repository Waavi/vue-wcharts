import { shallowMount } from '@vue/test-utils'
import WBar from './WBar.vue'

describe('Components/WBar', () => {
    const dataset = [
        {
            name: 'Page A', one: 4000, two: -2400, three: 2300, four: 1200, five: 2300,
        },
        {
            name: 'Page B', one: 3000, two: 2210, three: 1398, four: 1200, five: 1398,
        },
        {
            name: 'Page C', one: 9800, two: 2200, three: 0, four: 1200, five: 0,
        },
    ]

    const propsData = {
        datakey: 'one',
        index: 0,
    }

    const provide = {
        Chart: {
            dataset,
            activeElements: [0],
            bounds: {
                max: 8800,
                min: 0,
            },
            positionsPerGroupOfBars: [[0]],
            numberOfBarsPerGroup: 1,
            maxBarWidth: 80,
            canvas: {
                x0: 50, y0: 25, x1: 500, y1: 250, height: 243, width: 702,
            },
            padding: [0, 0, 0, 0],
            curData: [
                [[0, 4000], [0, 3000], [0, 9800]],
            ],
            snap: {
                linesByIndex: {
                    0: {
                        datakey: 'one',
                    },
                },
                barsDatakeysColors: {
                    one: [
                        '#e8e8e8',
                        '#e8e8e8',
                        '#e8e8e8',
                    ],
                },
                barIds: [
                    0,
                ],
            },
            yScale: a => a,
            cleanActive: a => a,
        },
    }
    provide.Chart.curData[0].key = 'one'

    const defaultConfig = {
        propsData,
        provide,
    }

    it(`Should be render correctly`, () => {
        const wrapper = shallowMount(WBar, defaultConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Shouldn't be render`, () => {
        const customConfig = { ...defaultConfig, provide: { ...defaultConfig.provide, Chart: { ...defaultConfig.provide.Chart, activeElements: [] } } }
        const wrapper = shallowMount(WBar, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render with label correctly`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, showLabel: true } }
        const wrapper = shallowMount(WBar, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it(`Should be render with stackedlabel correctly`, () => {
        const customConfig = { ...defaultConfig, propsData: { ...defaultConfig.propsData, stacked: true, showStackedLabel: true } }
        const wrapper = shallowMount(WBar, customConfig)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
