<template>
    <ion-text>{{ price }}</ion-text>
</template>

<script>
import { computed, toRefs } from 'vue';

const SURGE_CHANGE_RATE = 1.5;
export default {
    props: {
        duration: {
            type: Number,
            required: true
        },
        multiplier: {
            type: Number,
            required: true
        },
    },
    setup(props) {
        const { duration, multiplier } = toRefs(props)
        const price = computed(() => {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format((duration.value * SURGE_CHANGE_RATE * multiplier.value) / 100);
        });

        return { price };
    },
}
</script>