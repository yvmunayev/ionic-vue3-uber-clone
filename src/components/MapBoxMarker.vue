<script setup>
    import { inject, defineProps, toRefs, watch, ref, onMounted } from '@vue/runtime-core';
    import { Marker } from 'mapbox-gl';
    
    const props = defineProps({
        option: Object,
        coordinates: [Array, Object],
    });
    const { option, coordinates } = toRefs(props);
    const marker = ref();
    const map = inject('map');
    const setMarkerCoordinates = inject('setMarkerCoordinates');
    
    onMounted(() => {
        marker.value = new Marker(option.value);
        if (coordinates.value) {
            marker.value.setLngLat(coordinates.value).addTo(map.value);
            setMarkerCoordinates(coordinates.value)
        }
    });

    watch(coordinates, (newCoordinates) => {
        const isNotAddToMap = !marker.value.getLngLat();
        marker.value.setLngLat([...newCoordinates]);
        setMarkerCoordinates([...newCoordinates])
        if(isNotAddToMap) {
            marker.value.addTo(map.value);
        }
    })

</script>