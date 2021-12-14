<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-text color="danger">
			<h4>Ionic Vue 3 Uber Clone</h4>
        </ion-text>
      </ion-grid>
      <ion-item>
        <mapbox-geocoding-autocomplete
			v-model="placeQuery"
			@select="handleSelect"
			placeholder="Where From?"
        ></mapbox-geocoding-autocomplete>
      </ion-item>
      <ion-grid>
        <ion-row id="navigation-content">
			<ion-button :router-link="ridePath" class="navigation-button" color="light">
				<div>
					<el-image
						style="width: 90px; height: 90px"
						src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png"
						:fit="cover"
					></el-image>
					<p class="text-md font-bold">Get Ride</p>
					<font-awesome-icon size="1x" icon="arrow-right" />
				</div>
			</ion-button>
			<ion-button :router-link="foodPath" class="navigation-button" color="light">
				<div>
					<el-image
						style="width: 90px; height: 90px"
						src="https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png"
						:fit="cover"
					></el-image>
					<p class="text-md font-bold">Food</p>
					<font-awesome-icon size="1x" icon="arrow-right" />
				</div>
			</ion-button>
        </ion-row>
      </ion-grid>
      <ion-grid class="ion-margin">
        <ion-list>
			<ion-item v-for="item in mapCardFavouritesData" :key="item.location">
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
    </ion-content>
  </ion-page>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import { IonPage, IonGrid, IonRow, IonButton, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/vue';
	import { useStore } from 'vuex';
	import MapboxGeocodingAutocomplete from '../components/MapboxGeocodingAutocomplete.vue';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
	import mapCardFavouritesData from '../data/mapCardFavouritesData.json';

	const store = useStore();
	const placeQuery = ref();

	const originText = computed( () => store.state.origin && store.state.origin.place_name);
	const ridePath = computed(() => (originText.value ? '/map' : ''));
	const foodPath = computed(() => (originText.value ? '/food' : ''));

	const handleSelect = (place) => {
		store.commit('setOrigin', place);
	};

</script>

<style>
	#navigation-content {
	display: flex;
		justify-content: center;
	}
	.navigation-button {
	height: 200px;
	margin: 15px;
	}
	.el-autocomplete {
	width: 100%;
	}
	.el-autocomplete .el-input__inner {
	background: transparent;
	border: none;
	font-size: 17px;
	font-weight: 400;
	color: #fff;
	padding: 0px;
	}
</style>