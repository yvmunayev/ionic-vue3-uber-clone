<template>
  <el-autocomplete
    :fetch-suggestions="querySearchAsync"
    :trigger-on-focus="false"
    placeholder="Enter place"
    class="autocomplete"
  />
</template>

<script setup>
import Geocoding from "@mapbox/mapbox-sdk/services/geocoding";

const geocodingClient = Geocoding({
  accessToken: 'pk.eyJ1IjoieXZtdW5heWV2IiwiYSI6ImNrd3g1N3I0YzA5emEybnExMGE0NDl0ZXcifQ.Vjb0inKxrwRLP65IttASVQ',
});


const querySearchAsync = (query, setOptions) => {
  geocodingClient
    .forwardGeocode({
      query,
      limit: 7,
      autocomplete: true,
    })
    .send()
    .then((response) => {
      if (response && response.body && Array.isArray(response.body.features)) {
        const options = response.body.features.map((value) => ({
          value: value.place_name,
          ...value,
        }));
        setOptions(options);
      } else {
        setOptions([]);
      }
    });
};
</script>

<style scoped>
.autocomplete {
  width: 300px;
}
</style>
