<template>
    <ion-text>{{ price }}</ion-text>
</template>

<script setup>
    import { defineProps, computed, toRefs } from '@vue/runtime-core';

    const SURGE_CHANGE_RATE = 1.5;

    const props = defineProps({
        duration: {
            type: Number,
            required: true
        },
        multiplier: {
            type: Number,
            required: true
        },
    });

    const { duration, multiplier } = toRefs(props)
    const price = computed(() => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format((duration.value * SURGE_CHANGE_RATE * multiplier.value) / 100);
    });

</script>