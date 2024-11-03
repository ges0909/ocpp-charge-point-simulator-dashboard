<template>

  <!-- https://vuetifyjs.com/en/features/application-layout/#placing-components -->
  <v-layout class="rounded rounded-md">

    <v-app-bar title="OCPP Charge Point Simulator" color="secondary">
      <v-btn variant="elevated" color="primary" class="mr-2">Import</v-btn>
      <v-btn variant="elevated" color="primary" class="mr-2">Export</v-btn>
    </v-app-bar>

    <!--
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation bar"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    -->

    <v-main class="d-flex align-center justify-center">
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-row>
              <v-chip>
                BootNotification
              </v-chip>
            </v-row>
            <v-row>
              <v-chip>
                StatusNotification
              </v-chip>
            </v-row>
          </v-col>
          <v-col cols="10">
            <ChargePointTable/>
          </v-col>
        </v-row>
      </v-container>
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
