<template>
  <div class="mise">
    <h1>미세 먼지 정보</h1>
    <div v-if="airPollutionData.length">
      <div v-for="data in airPollutionData" :key="data.stationName">
        <p>
          지역: {{ data.stationName }}, 오존: {{ data.o3Value }}, 일산화탄소:
          {{ data.coValue }}, 미세먼지: {{ data.pm10Value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      airPollutionData: []
    }
  },

  mounted() {
    axios
      .get('http://localhost:3000/api/air-pollution')
      .then((response) => {
        this.airPollutionData = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style></style>
