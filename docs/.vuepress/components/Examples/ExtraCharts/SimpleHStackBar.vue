<template>
    <WSimpleHStackBar
        :dataset="[67.3, 4.3]"
        showLabel
        :style="{ marginBottom: '50px' }"
    >
        <template #value="{ value, percentage, color }">
            <span>{{ value }}</span>
        </template>
    </WSimpleHStackBar>
</template>

<script>
export default {
    name: 'SimpleHStackBar',
}
</script>
