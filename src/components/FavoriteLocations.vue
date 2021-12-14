<template>
    <ion-grid class="ion-margin">
        <ion-list>
			<ion-item v-for="item in mapCardFavoritesData" :key="item.location">
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
    import { IonGrid,  IonList, IonItem, IonLabel, IonAvatar } from '@ionic/vue';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    
	import mapCardFavoritesData from '../data/mapCardFavoritesData.json';
</script>