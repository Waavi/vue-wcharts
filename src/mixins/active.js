const TYPES = {
    point: 'POINT',
}

const initial = {
    el: null,
    event: null,
    type: null,
    types: TYPES,
}

export default {
    data () {
        return {
            active: initial,
        }
    },
    methods: {
        setActive (el, event, type) {
            this.active = {
                ...this.active,
                el,
                event,
                type,
            }
        },
        cleanActive () {
            this.active = { ...initial }
        },
    },
}
