import {
    genTicks,
    genExactNbTicks,
    bound,
} from './maths'

describe('Utils/maths', () => {
    it('genExactNbTicks works correctly', () => {
        expect(genExactNbTicks(0, 10, 6)).toEqual([0, 2, 4, 6, 8, 10])
        expect(genExactNbTicks(10, 0, 6)).toEqual([0, 2, 4, 6, 8, 10])
    })
    it('genTicks works correctly', () => {
        expect(genTicks(0, 10, 6)).toEqual([0, 2, 4, 6, 8, 10])
        expect(genTicks(10, 0, 6)).toEqual([0, 2, 4, 6, 8, 10])
    })
    it('bound works correctly', () => {
        const data = [[[0, 2300], [-100, 1398], [0, 0], [0, 2000]]]
        expect(bound(data, 'min', 0)).toEqual(-100)
        expect(bound(data, 'max', 1)).toEqual(2300)
    })
})
