import VueTypes from 'vue-types'
import isEqual from 'lodash.isequal'
import { PALETTE, COLORS, colorNormalizer as themeColorNormalizer } from '../options/theme'
import { enqueueRegisterUpdateFactory } from './chartUtils'

export const ColorType = VueTypes.oneOfType([
    VueTypes.string,
    VueTypes.shape({
        key: VueTypes.string,
        main: VueTypes.string,
    }).loose,
])

export default {
    props: {
        palette: VueTypes.arrayOf(ColorType).def(PALETTE),
        colors: VueTypes.objectOf(ColorType).def(COLORS),
        colorNormalizer: VueTypes.func.def(themeColorNormalizer),
    },
    data () {
        return {
            chosenColors: {},
        }
    },
    computed: {
        normalizedPalette () {
            const { palette, colorNormalizer } = this
            return palette.map(colorNormalizer)
        },
        normalizedColors () {
            const { colors, colorNormalizer } = this
            return Object.keys(colors).reduce((acc, key) => ({ ...acc, [key]: colorNormalizer({ key, ...colors[key] }) }), {})
        },
        availablePalette () {
            const { normalizedPalette, chosenColors } = this
            const chosenColorKeys = Object.values(chosenColors).map(c => c.key)
            return normalizedPalette.filter(c => !chosenColorKeys.includes(c.key))
        },
    },
    methods: {
        /**
         * Function that registers all the relevant data for a legend item.
         * @param {string} uid unique identifier for the component.
         * @param {string} colorKey the color key
         */
        registerColor (uid, color) {
            const {
                availablePalette, normalizedColors, chosenColors, colorNormalizer,
            } = this
            let normalizedColor
            if (color) {
                normalizedColor = normalizedColors[color] || colorNormalizer(color)
            } else if (chosenColors[uid]) {
                return chosenColors[uid]
            } else {
                normalizedColor = availablePalette[this.paletteCurrentIndex % availablePalette.length]
                this.paletteCurrentIndex += 1
            }

            this.enqueueChosenColorsUpdate(uid, normalizedColor)
            return normalizedColor
        },

        /**
         * Function that unregisters a legend item.
         * @param {string} uid unique identifier for the component.
         */
        unregisterColor (uid) {
            this.enqueueChosenColorsUpdate(uid)
        },
    },
    created () {
        this.paletteCurrentIndex = 0

        this.enqueueChosenColorsUpdate = enqueueRegisterUpdateFactory(
            // needsToBeUpdated
            (id, data) => !isEqual(this.chosenColors[id], data),
            // onFlush action (given an array of `{ key, value }` assuming an undefined value as the action to remove an element)
            (chosenColorsArray) => {
                const newChosenColorss = { ...this.chosenColors }
                chosenColorsArray.forEach(({ key: id, value: data }) => {
                    if (data !== undefined) { // adds the data
                        newChosenColorss[id] = { ...data }
                    } else { // removes the data
                        delete newChosenColorss[id]
                    }
                })
                this.chosenColors = newChosenColorss
            },
            100, // wait time for inner debounce method
            'chosenColors' // only for debug
        )
    },
}
