<template>
    <div :id="id">
        <div v-if="isLoaded">
            <slot />
        </div>
    </div>
</template>

<script setup>
    import { defineProps, toRefs, onMounted, provide, watch, ref, defineExpose } from '@vue/runtime-core';
    import { Map, LngLatBounds } from 'mapbox-gl';

    import 'mapbox-gl/dist/mapbox-gl.css';

    const props = defineProps({
        accessToken: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        center: [Array, Object],
        styleMap: {
            type: String,
            default: 'mapbox://styles/mapbox/streets-v11',
        },
        zoom: {
            type: Number,
            default: 12,
        }
    });
    const { id, accessToken, center, styleMap, zoom } = toRefs(props);
    const isLoaded = ref();
    const map = ref();
    const fitBounds = ref(false);
    const bounds = ref();

    defineExpose({map})

    onMounted(() => {
        map.value = new Map({
            accessToken: accessToken.value,
            container: id.value,
            center: center.value ? center.value : [0, 0],
            style: styleMap.value,
            zoom: zoom.value,
        });

        map.value.on('load', () => {
            isLoaded.value = true;
        });

        const { _ne, _sw } = map.value.getBounds();
        bounds.value = new LngLatBounds(_ne, _sw);

        watch(center, (newCenter) => {
            map.value.setCenter(newCenter);
        })

        
    });
    
    const setMarkerCoordinates = (newCoordinates) => {
        bounds.value.extend(newCoordinates);
        if(fitBounds.value) {
            map.value.fitBounds(bounds.value, {
                padding: { top: 40, bottom: 20, left: 20, right: 20 },
            });
        } else {
            fitBounds.value = true;
        }
    }
    // const addMarker = (marker) => {
    //     marker.addTo(map.value);
    //     markers.value.push(marker);

    //     console.log(markers.value.length, 'asdasdasdas')

        

    //     if (markers.value.length > 1) {
            
            
    //     }
    // };

    provide('accessToken', accessToken);
    provide('map', map);
    provide('setMarkerCoordinates', setMarkerCoordinates);

</script>