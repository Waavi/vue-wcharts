<template>
    <div
        class="SourceCode"
        :style="styles"
    >
        <button class="Header" :class="{ opened }" @click="toggle">
            <span>Source Code</span>
        </button>
        <Collapsed :collapsed="opened">
            <slot />
        </Collapsed>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import Collapsed from './Collapsed'

export default {
    name: 'SourceCode',
    components: {
        Collapsed,
    },
    props: {
        collapsed: VueTypes.bool.def(true),
        styles: VueTypes.object,
    },
    data() {
        return {
            opened: !this.collapsed,
        }
    },
    methods: {
        toggle () {
            this.opened = !this.opened
        }
    }
}
</script>
<style lang="scss">
.Header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 15px;
    border: 0;
    border-radius: 6px;
    background: #f2f2f2;
    color: #2c3e50;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    cursor: pointer;

    &:after {
        content: '';
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #2c3e50;
        transition: all 250ms ease;
    }

    &.opened {
        &:after {
            transform: rotate(180deg)
        }
    }
}
</style>