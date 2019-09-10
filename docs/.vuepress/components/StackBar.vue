<template>
    <div class="Container">
        <WStackBar
            :total="data.total"
            :dataset="data.dataset"
            :labelStyles="labelStyles"
            showLabel
        >
            <template #value="{ value, percentage, color }">
                <span>{{ value }}€ ({{ percentage }})</span>
            </template>
        </WStackBar>
    </div>
</template>

<script>
import { stack as data } from './data'

const labelStyles = {
    top: '3px',
    left: '6px',
    color: 'white',
}

export default {
    name: 'StackBar',
    data () {
        return {
            data,
            labelStyles,
        }
    }
}
</script>