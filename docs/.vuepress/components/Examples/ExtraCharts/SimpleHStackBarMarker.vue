<template>
    <WSimpleHStackBar
        :total="81.6"
        :dataset="[37.3, 20.3, 23.6]"
        showLabel
        :markers="[13.3, 78]"
        :style="{ marginBottom: '50px' }"
    >
        <template #value="{ value, percentage, color }">
             <span>{{ value }}€ ({{ percentage }})</span>
        </template>
    </WSimpleHStackBar>
</template>

<script>
export default {
    name: 'SimpleHStackBarMarker',
}
</script>
