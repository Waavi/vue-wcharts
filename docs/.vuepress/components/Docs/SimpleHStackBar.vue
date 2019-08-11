<template>
    <div class="Container">
        <WSimpleHStackBar
            :total="data.total"
            :dataset="data.dataset"
            :labelStyles="labelStyles"
            showLabel
        >
            <template #value="{ value, percentage, color }">
                <span>{{ value }}€ ({{ percentage }})</span>
            </template>
        </WSimpleHStackBar>
    </div>
</template>

<script>
import { stack as data } from '../data'

const labelStyles = {
    top: '3px',
    left: '6px',
    color: 'white',
}

export default {
    name: 'SimpleHStackBar',
    data () {
        return {
            data,
            labelStyles,
        }
    }
}
</script>