<template>
  <v-data-table
      :headers="headers"
      :item-value="(item: ChargePoint) => `${item.name}`"
      :items="items"
      :sort-by="[{ key: 'name', order: 'asc' }]"
      items-per-page="10"
      show-select
  >
    <!-- table columns -->

    <!-- column: connection state -->
    <template v-slot:item.connection_state="{ item }: { item: any }">
      <v-row class="h-75 w-75">
        <v-chip :color="item.connection_state_color" class="primary fa-primary">
          {{ item.connection_state }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-select
            v-model="item.connection_state"
            :items="CONNECTION_ACTIONS"
            variant="underlined"
            density="compact"
            class="primary fa-primary"
        ></v-select>
      </v-row>
    </template>

    <!-- column: charging state -->
    <template v-slot:item.charging_state="{ item }: { item: any }">
      <v-row class="h-75 w-75">
        <v-chip class="primary fa-primary">
          {{ item.charging_state }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-select
            v-model="item.charging_state"
            :items="CHARGING_STATES"
            variant="underlined"
            density="compact"
            class="primary fa-primary"
        ></v-select>
      </v-row>
    </template>

    <!-- column: actions -->
    <template v-slot:item.actions="{ item }: { item: any }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon class="me-2" size="small" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

    <!-- dialogs -->

    <!-- dialog:  add item -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ t("$msg.title") }}
        </v-toolbar-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              {{ t("$msg.add") }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row cols="12" md="4" sm="6">
                  <v-text-field
                      v-model="editedItem.name"
                      :label="t('$msg.header_name')"
                  ></v-text-field>
                </v-row>
                <v-row cols="12" md="4" sm="6">
                  <v-text-field
                      v-model="editedItem.connectors"
                      :label="t('$msg.header_connectors')"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                {{ t("$msg.cancel") }}
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                {{ t("$msg.ok") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- dialog: delete item -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">
              {{ t("$msg.remove") }}
            </v-card-title>
            <v-card-actions>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                {{ t("$msg.cancel") }}
              </v-btn>
              <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
              >
                {{ t("$msg.ok") }}
              </v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!---->
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, nextTick, ref, watch, Ref} from "vue";
import type {ChargePoint} from "../types/ChargePoint.ts";
import {CONNECTION_ACTIONS} from "../types/ConnectionAction.ts";
import {CHARGING_STATES} from "../types/ChargingState.ts";
import {charge_point_table_header} from "../data/charge-point-table-header.ts";
import {charge_point_table_data} from "../data/charge-point-table-data.ts";

import {ws_connect} from "../web_socket.ts";

const {t} = useI18n();

const headers = ref(charge_point_table_header);
const items: Ref<Array<ChargePoint>> = ref(charge_point_table_data);

const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  connectors: 1,
});
const defaultItem = ref({
  name: "",
  connectors: 1,
});
const formTitle = computed(() => {
  return editedIndex.value === -1 ? t("$msg.title_add") : t("$msg.title_edit");
});

function editItem(item: ChargePoint) {
  editedIndex.value = items.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function deleteItem(item: ChargePoint) {
  editedIndex.value = items.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
}

function deleteItemConfirm() {
  items.value.splice(editedIndex.value, 1);
  closeDelete();
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

function save() {
  if (editedIndex.value > -1) {
    Object.assign(items.value[editedIndex.value], editedItem.value);
  } else {
    items.value.push(editedItem.value);
  }
  close();
}

watch(dialog, (val) => {
  val || close();
});

watch(dialogDelete, (val) => {
  val || closeDelete();
});

ws_connect(items.value);

</script>

<style lang="css" scoped>
</style>
