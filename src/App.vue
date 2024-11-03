<template>

  <!-- https://vuetifyjs.com/en/features/application-layout/#placing-components -->
  <v-layout class="rounded rounded-md">

    <v-app-bar title="Valantic OCPP Charge Point Simulator">
    </v-app-bar>

    <!--
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation bar"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    -->

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <ChargePointTable/>
    </v-main>

    <!--
    <v-footer>
    </v-footer>
    -->

  </v-layout>

</template>

<script setup lang="ts">
import ChargePointTable from "./components/ChargePointTable.vue";
</script>

<style scoped>
</style>
