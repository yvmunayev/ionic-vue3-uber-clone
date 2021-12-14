import { createStore } from 'vuex';

export default createStore({
    state: {
        origin: null,
        destination: null,
        travelTimeInfo: null,
    },
    mutations: {
        setOrigin(state, newOrigin) {
            state.origin = newOrigin;
        },
        setDestination(state, newDestination) {
            state.destination = newDestination;
        },
        setTravelTimeInfo(state, newTravelTimeInfo) {
            state.travelTimeInfo = newTravelTimeInfo;
        },
    },
    actions: {},
    modules: {},
})
