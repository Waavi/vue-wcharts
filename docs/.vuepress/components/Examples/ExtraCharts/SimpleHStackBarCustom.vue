<template>
    <WSimpleHStackBar
        :total="81.6"
        :dataset="[37.3, 20.3, 23.6]"
        showLabel
        :labelStyles="{
            top: '4px',
            left: '6px',
            color: 'white',
        }"
        :style="{ marginBottom: '50px' }"
    >
        <template #value="{ value, percentage, color }">
             <span>{{ value }}€ ({{ percentage }})</span>
        </template>
    </WSimpleHStackBar>
</template>

<script>
export default {
    name: 'SimpleHStackBarCustom',
}
</script>
