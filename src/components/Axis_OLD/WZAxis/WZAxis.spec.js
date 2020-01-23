import { shallowMount } from '@vue/test-utils'
import WZAxis from './WZAxis.vue'

describe('Axis/WZAxis', () => {
    const dataset = [
        {
            name: 'Page A',
            one: 1000,
            two: 2400,
            three: 2400,
        },
        {
            name: 'Page B',
            one: 3000,
            two: 1398,
            three: 2210,
        },
        {
            name: 'Page C',
            one: 2000,
            two: 9800,
            three: 2290,
        },
    ]

    const canvas = {
        x0: 40,
        y0: 10,
        width: 540,
        height: 366,
        x1: 580,
        y1: 376,
    }

    const bounds = {
        max: 8800,
        min: 10,
    }

    const propsData = {
        name: 'Z Axis',
        datakey: 'three',
        range: [100, 2000],
    }

    const provide = {
        Chart: {
            dataset,
            data: dataset,
            canvas,
            bounds,
            spaceObjects: [10, 10, 10, 10],
            yScale: a => a,
            setAxisOptions: () => undefined,
        },
    }

    const defaultConfig = {
        propsData,
        provide,
    }

    xit(`Should be set props correctly`, () => {
        const wrapper = shallowMount(WZAxis, defaultConfig)
        expect(wrapper.vm.datakey).toEqual('three')
    })

    xit(`Should be executed preload method correctly`, () => {
        const parent = {
            axis: {
                z: {
                    datakey: '',
                    name: '',
                    range: '',
                },
            },
        }

        const sibling = {
            axis: {
                z: {
                    datakey: '',
                    name: '',
                    range: '',
                },
            },
        }

        WZAxis.preload({ parent, props: propsData })
        expect(parent.axis.z.datakey).toEqual(propsData.datakey)
        expect(parent.axis.z.name).toEqual(propsData.name)
        expect(parent.axis.z.range).toEqual(propsData.range)

        WZAxis.preload({ parent: sibling, props: { ...propsData, name: undefined } })
        expect(sibling.axis.z.name).toEqual('')
    })
})
