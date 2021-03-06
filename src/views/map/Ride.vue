<template>
    <div>
        <ion-grid class="ion-margin">
            <ion-row>
                <ion-button router-link="/map/whereto" class="button" color="light">
                    <font-awesome-icon size="1x" icon="arrow-left" />
                </ion-button>
                <ion-title >Select a ride of {{ distance }} ml</ion-title>
            </ion-row>
        </ion-grid>

        <ion-grid v-show="distance" class="ion-margin">
        <ion-list>
            <ion-item
                button
                v-for="item in mapRideData"
                :key="item.title"
                @click="handleClick(item)"
                :color="chosenOption && item.title === chosenOption.title ?  'secondary' : 'light' "
            >
                <ion-thumbnail class="ride-thumbnail">
                    <ion-img class="ride-img" :src="item.image"></ion-img>
                </ion-thumbnail>
                <ion-label class="ride-label">
                    <h3>{{item.title}}</h3>
                    <p>{{ durationHHMM }}</p>
                </ion-label>
                <ion-label class="ride-price-label">
                    <ride-price :duration="duration" :multiplier="item.multiplier" ></ride-price>
                </ion-label>
            </ion-item>
        </ion-list>
        <br/>
        <ion-button expand="block" size="large" color="danger" :disabled="!chosenOption" @click="handleChoose">Choose</ion-button>
        </ion-grid>
    </div>
</template>

<script setup>
    import { computed, ref} from "@vue/runtime-core";
    import { useStore } from "vuex";
    import { IonGrid, IonItem, IonLabel, IonList, IonThumbnail, IonImg, IonButton, IonTitle, toastController } from '@ionic/vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import RidePrice from '../../components/RidePrice.vue';
    import toHHMMSS from '../../helpers/toHHMMSS';
    import mapRideData from '../../data/mapRideData.json'

    const chosenOption = ref();
    const store = useStore();
    const distance = computed(
        () => store.state.travelTimeInfo && parseInt(store.state.travelTimeInfo.routes[0].distance / 1609, 10)
    );
    const duration = computed(() => store.state.travelTimeInfo && store.state.travelTimeInfo.routes[0].duration);
    const durationHHMM = computed(() => duration.value && toHHMMSS(duration.value));

    const handleClick = (item) => {
        chosenOption.value = item;
    }

    const handleChoose = async () => {
        const toast = await toastController.create({
            message: `You have chosen an ${chosenOption.value.title} for your trip.`,
            duration: 2000,
            color: 'success',
            buttons: [{
                role: 'cancel',
                text: 'X',
            }],       
        });

        await toast.present();

        const { role } = await toast.onDidDismiss();
        if (role == 'cancel') {
            const cancelToast = await toastController.create({
                message: `Your ${chosenOption.value.title} ride has been canceled.` ,
                color: 'danger',
                duration: 2000,      
            });
            await cancelToast.present();
        }
    }

</script>

<style scoped>
    .ride-thumbnail{
        width: 80px;
        height: 80px;
    }

    .ride-img {
        object-fit: contain;
    }
    .ride-label {
        text-align: center;
    }
    .ride-price-label {
        text-align: right;
    }
</style>
