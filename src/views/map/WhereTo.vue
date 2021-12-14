<template>
    <ion-item class="ion-margin">
        <mapbox-geocoding-autocomplete
            v-model="placeQuery"
            @select="handleSelect"
            placeholder="Where To?"
        ></mapbox-geocoding-autocomplete>
    </ion-item>
    <favorite-locations />
</template>

<script setup>
    import { ref } from 'vue';
    import { useStore } from "vuex";
    import { MapboxGeocodingAutocomplete, FavoriteLocations } from '../../components/';

    const placeQuery = ref('');
    const store = useStore();

    const handleSelect = (place) => {
        store.commit("setDestination", place);
    };
</script>