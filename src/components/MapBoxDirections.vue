<script setup>
    import { inject, defineProps, toRefs, watch, defineEmits, onMounted } from '@vue/runtime-core';
    import Directions from '@mapbox/mapbox-sdk/services/directions';
     
    const props = defineProps({
        coordinatesOrigin: Object,
        coordinatesDestination: Object,
    });
    const emit = defineEmits('load');
    const { coordinatesOrigin, coordinatesDestination } = toRefs(props);
    const map = inject('map');
    const accessToken = inject('accessToken');

    const directionsClient = Directions({
        accessToken: accessToken.value,
    });

    const calculateDirection = ([newOrigin, newDestination]) => {
        if (newOrigin && newDestination) {
            const waypoints = [
                {
                coordinates: newOrigin
                },
                {
                coordinates: newDestination
                },
            ];

            directionsClient.getDirections({
            profile: 'driving-traffic',
            geometries: 'geojson',
            waypoints,
            })
            .send()
            .then(response => {
                const data = response.body.routes[0];
                emit('load', response.body);
                const route = data.geometry.coordinates;
                const geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                    type: 'LineString',
                    coordinates: route
                    }
                };

                if (map.value.getSource('route')) {
                    map.value.getSource('route').setData(geojson);
                } else {
                    map.value.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#c00',
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                    });
                }
            });
        }
    };

    onMounted(() => {
        calculateDirection([coordinatesOrigin.value, coordinatesDestination.value]);
    })

    watch([coordinatesOrigin, coordinatesDestination], (newValues) => {
        calculateDirection(newValues);
    });

</script>