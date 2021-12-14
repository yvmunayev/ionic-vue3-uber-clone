<template>
    <ion-item class="ion-margin">
        <mapbox-geocoding-autocomplete
            v-model="placeQuery"
            @select="handleSelect"
            placeholder="Where To?"
        ></mapbox-geocoding-autocomplete>
    </ion-item>
    <favorite-locations @select="handleSelect" />
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useStore } from "vuex";
    import { MapboxGeocodingAutocomplete, FavoriteLocations } from '../../components/';

    const store = useStore();
    const destinationText = computed( () => store.state.destination && store.state.destination.place_name);
    const placeQuery = ref(destinationText.value);
    

    const handleSelect = (place) => {
        store.commit("setDestination", place);
        placeQuery.value = place.value;
    };
</script>