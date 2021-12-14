<template>
    <ion-grid class="ion-margin">
        <ion-list>
			<ion-item button v-for="item in mapCardFavoritesData" :key="item.location" @click="handleClickAsync(item.destination)">
				<ion-avatar>
					<font-awesome-icon size="lg" :icon="item.icon" />
				</ion-avatar>
				<ion-label>
					<h3>{{ item.location }}</h3>
					<p>{{ item.destination }}</p>
				</ion-label>
			</ion-item>
        </ion-list>
    </ion-grid>
</template>

<script setup>
	import { defineEmits } from 'vue';
    import { IonGrid,  IonList, IonItem, IonLabel, IonAvatar } from '@ionic/vue';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import Geocoding from '@mapbox/mapbox-sdk/services/geocoding';

	import mapCardFavoritesData from '../data/mapCardFavoritesData.json';

	const geocodingClient = Geocoding({
		accessToken: 'pk.eyJ1IjoieXZtdW5heWV2IiwiYSI6ImNrd3g1N3I0YzA5emEybnExMGE0NDl0ZXcifQ.Vjb0inKxrwRLP65IttASVQ',
	});

	const emit = defineEmits('select');

	const handleClickAsync = (query) => {
		geocodingClient.forwardGeocode({
			query,
			limit: 1,
		})
		.send()
		.then((response) => {
			if (response && response.body && Array.isArray(response.body.features)) {
				const place = response.body.features[0];
				emit('select', { value: place.place_name, ...place });
			} else {
				emit('select', undefined);
			}
		});
	};
    
</script>