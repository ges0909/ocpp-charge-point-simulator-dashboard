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
      <div class="text-begin">
        <v-chip
            :color="item.connection_state_color"
            class="text-uppercase"
            label
            size="small"
        >{{ item.connection_state }}
        </v-chip>
      </div>
    </template>

    <!-- column: charging state -->
    <template v-slot:item.charging_state="{ item }: { item: any }">
      <div class="h-50 w-50">
        <v-select
            v-model="item.charging_state"
            :items="CHARGING_STATES"
            class="h-auto"
            density="compact"
        ></v-select>
      </div>
    </template>

    <!-- column: actions -->
    <template v-slot:item.actions="{ item }: { item: any }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete</v-icon>
    </template>

    <!-- dialogs -->

    <!-- dialog:  add item -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ t("title") }}
        </v-toolbar-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              {{ t("add") }}
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
                      :label="t('header_name')"
                  ></v-text-field>
                </v-row>
                <v-row cols="12" md="4" sm="6">
                  <v-text-field
                      v-model="editedItem.connectors"
                      :label="t('header_connectors')"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                {{ t("cancel") }}
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                {{ t("ok") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- dialog: delete item -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">
              {{ t("remove") }}
            </v-card-title>
            <v-card-actions>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                {{ t("cancel") }}
              </v-btn>
              <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
              >
                {{ t("ok") }}
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
import {computed, nextTick, ref, watch} from "vue";
import {ChargePoint} from "../types/ChargePoint";
import {charge_point_table_header} from "../data/charge-point-table-header";
import {charge_point_table_data} from "../data/charge-point-table-data";
import {CHARGING_STATES} from "../types/ChargingState";
import {ws_connect} from "../web_socket.ts";

const {t} = useI18n();

const headers = ref(charge_point_table_header);
const items = ref([]);
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
  return editedIndex.value === -1 ? t("title_add") : t("title_edit");
});

// const connectionStates = ["Connected", "Disconnected", "Timeout"];

function initialize() {
  items.value = charge_point_table_data;
  ws_connect(items.value);
}

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

initialize();
</script>

<style lang="css" scoped>
:deep(.v-field) {
  font-size: 0.85rem !important;
}
</style>
