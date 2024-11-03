<template>
  <v-data-table
      :headers="headers"
      :item-value="(item: ChargePoint) => `${item.name}`"
      :items="items"
      :sort-by="[{ key: 'name', order: 'asc' }]"
      @input="selectEvent"
      items-per-page="10"
      show-select
  >
    <!-- table columns -->

    <!-- column: connection state -->
    <template v-slot:item.connection_state="{ item }: { item: any }">
      <v-row align="center">
        <v-chip color="item.connection_state_color" class="primary fa-primary">
          {{ item.connection_state_confirmed }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-select
            v-model="item.connection_state_requested"
            :items="CONNECTION_ACTIONS"
            variant="underlined"
            density="compact"
            class="primary fa-primary"
            :label="t('$msg.select')"
        ></v-select>
      </v-row>
    </template>

    <!-- column: charging state -->
    <template v-slot:item.charging_state="{ item }: { item: any }">
      <v-row align="center">
        <v-chip color="grey" class="primary fa-primary">
          {{ item.charging_state_confirmed }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-select
            v-model="item.charging_state_requested"
            :items="CHARGING_STATES"
            variant="underlined"
            density="compact"
            class="primary fa-primary"
            :label="t('$msg.select')"
        ></v-select>
      </v-row>
    </template>

    <!-- column: meter value -->
    <template v-slot:item.meter_value="{ item }: { item: any }">
      <v-row align="center">
        <v-chip color="grey" class="primary fa-primary">
          {{ item.meter_value_confirmed }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="item.meter_value_requested"
            class="primary fa-primary"
            variant="underlined"
            :label="t('$msg.kwh')"
        ></v-text-field>
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
                      :rules="[required]"
                  ></v-text-field>
                </v-row>
                <v-row cols="12" md="4" sm="6">
                  <v-text-field
                      v-model="editedItem.connectors"
                      :label="t('$msg.header_connectors')"
                      :rules="[required]"
                  ></v-text-field>
                </v-row>
                <v-row cols="12" md="4" sm="6">
                  <v-text-field
                      v-model="editedItem.backend_url"
                      :label="t('$msg.header_backend_url')"
                      :rules="[required]"
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
import {computed, nextTick, ref, watch, Ref} from "vue";

import {useI18n} from "vue-i18n";

import type {ChargePoint} from "../types/ChargePoint.ts";
import {CONNECTION_ACTIONS} from "../types/ConnectionAction.ts";
import {CHARGING_STATES} from "../types/ChargingState.ts";
import {CHARGE_POINT_TABLE_HEADER} from "../data/ChargePointTableHeader.ts";
import {CHARGE_POINT_TABLE_DATA} from "../data/ChargePointTableData.ts";

import {ws_connect} from "../web_socket.ts";

const {t} = useI18n();

const headers = ref(CHARGE_POINT_TABLE_HEADER);
const items: Ref<Array<ChargePoint>> = ref(CHARGE_POINT_TABLE_DATA);

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

const required = (value: string) => !!value || t("$msg.required")

const selectEvent = (event: Event) => console.log(event)

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

items.value.forEach((item: ChargePoint) => {
  ws_connect(item)
})
</script>

<style lang="css" scoped>

:deep(.v-field) {
  font-size: 0.875rem !important;
}

</style>
