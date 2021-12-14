<template>
  <ion-page>
    <map-box-map
        ref="map"
        id="map2"
        accessToken="pk.eyJ1IjoieXZtdW5heWV2IiwiYSI6ImNrd3g1N3I0YzA5emEybnExMGE0NDl0ZXcifQ.Vjb0inKxrwRLP65IttASVQ"
        :style="styleMap"
        :center="coordinatesOrigin"
    >
        <map-box-marker :coordinates="coordinatesOrigin" :option="MARKET_CONFIG"></map-box-marker>
        <map-box-marker :coordinates="coordinatesDestination" :option="MARKET_CONFIG"></map-box-marker>
        <map-box-directions
            :coordinatesOrigin="coordinatesOrigin"
            :coordinatesDestination="coordinatesDestination"
            @load="handleLoadDirections"
        ></map-box-directions>
    </map-box-map>
    <ion-button id="back-button" router-link="/home" class="button" color="light">
        <font-awesome-icon size="1x" icon="arrow-left" />
    </ion-button>
    <ion-content>
        <router-view />
    </ion-content>
  </ion-page>
</template>

<script setup>
    import { computed, ref } from "@vue/runtime-core";
    import { useRouter, RouterView } from "vue-router";
    import { useStore } from "vuex";
    import { IonPage, IonButton, isPlatform } from '@ionic/vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import {  MapBoxMap, MapBoxMarker, MapBoxDirections } from '../../components/';

    const MARKET_CONFIG= {
        color: '#C00',
    };

    const map = ref();
    const store = useStore();
    const router = useRouter();

    const coordinatesOrigin = computed(() => store.state.origin && store.state.origin.geometry.coordinates);
    const coordinatesDestination = computed(() => store.state.destination && store.state.destination.geometry.coordinates);
    // const hasTravelTimeInfo = computed(() => store.state.travelTimeInfo);
    const styleMap = isPlatform('mobile') ? 'height: 300px' : 'height: 400px';

    if (!store.state.origin) {
        router.replace('/home');
    }

    const handleLoadDirections = (response) => {
        store.commit('setTravelTimeInfo', response);
        router.push('/map/ride');
    }

</script>

<style scoped>
    #map {
        background-color: #eee;
    }
    #back-button {
        position: absolute;
        top: 5px;
        left: 5px;
        opacity: 0.7;
        border-radius: 50%;
    }
</style>
