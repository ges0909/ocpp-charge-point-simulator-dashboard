<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <!-- table columns -->

    <!-- column: connection state -->
    <template v-slot:item.connection_state="{ item }">
      <div class="text-begin">
        <v-chip
          :color="item.connection_state_color"
          class="text-uppercase"
          size="small"
          label
          >{{ item.connection_state }}
        </v-chip>
      </div>
    </template>

    <!-- column: charging state -->
    <template v-slot:item.charging_state="{ item }">
      <div class="h-50 w-50">
        <v-select
          :items="chargingStates"
          v-model="item.charging_state"
          density="compact"
        ></v-select>
      </div>
    </template>

    <!-- column: actions -->
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <!-- dialogs -->

    <!-- dialog:  add item -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ $t("title") }}
        </v-toolbar-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              {{ $t("add") }}
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
                    v-model="editedItem.backend_url"
                    :label="t('header_backend_url')"
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
                {{ $t("cancel") }}
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                {{ $t("ok") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- dialog: delete item -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">
              {{ $t("remove") }}
            </v-card-title>
            <v-card-actions>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                {{ $t("cancel") }}
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
              >
                {{ $t("ok") }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!---->
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, nextTick, ref, watch, Ref } from "vue";
import { io } from "socket.io-client";

const default_backend_url = "ws://localhost:8081/ocpp";

const { t } = useI18n();
const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref([
  {
    title: t("header_name"),
    key: "name",
    align: "start",
  },
  { title: t("header_connectors"), key: "connectors" },
  { title: t("header_connection_state"), key: "connection_state" },
  { title: t("header_charging_state"), key: "charging_state" },
  { title: t("header_meter_value"), key: "meter_value" },
  { title: t("actions"), key: "actions", sortable: false },
]);
const items: Ref = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  backend_url: default_backend_url,
  connectors: 1,
});
const defaultItem = ref({
  name: "",
  backend_url: default_backend_url,
  connectors: 1,
});
const formTitle = computed(() => {
  return editedIndex.value === -1 ? t("title_add") : t("title_edit");
});

// const connectionStates = ["Connected", "Disconnected", "Timeout"];

const chargingStates = [
  "Available",
  "Preparing",
  "Charging",
  "Finishing",
  "Reserved",
  "Faulted",
  "Accepted",
  "Invalid",
  "Blocked",
  "Expired",
];

function initialize() {
  items.value = [
    {
      name: "Frozen Yogurt",
      connectors: 2,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
    {
      name: "Ice cream sandwich",
      connectors: 2,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
    {
      name: "Eclair",
      connectors: 1,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
    {
      name: "Cupcake",
      connectors: 1,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
    {
      name: "Gingerbread",
      connectors: 3,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
    {
      name: "Jelly bean",
      connectors: 2,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
    {
      name: "Lollipop",
      connectors: 1,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
    {
      name: "Honeycomb",
      connectors: 1,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
    {
      name: "Donut",
      connectors: 1,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
    {
      name: "KitKat",
      connectors: 1,
      connection_state: "Disconnected",
      charging_state: "Available",
      meter_value: "",
      connection_state_color: ref("grey"),
      backend_url: default_backend_url,
      socket: null,
    },
  ];

  items.value.forEach((item) => {
    item.socket = io(item.backend_url, {
      transports: ["websocket"],
      autoConnect: true,
      timeout: 20000, // timeout in milliseconds for each connection attempt
    });
    item.socket.on("connect", () => {
      item.connection_state = "Connected";
      item.connection_state_color = "green";
      console.log(`${item.name} connected`);
    });
    item.socket.io.on("ping", () => {
      item.connection_state = "Connected";
      item.connection_state_color = "green";
      console.log(`${item.name} ping`);
    });
    item.socket.on("disconnect", (reason: string, detail: string) => {
      item.connection_state = "Disconnected";
      item.connection_state_color = "orange";
      console.log(`${item.name} disconnect: reason ${reason}, ${detail}`);
    });
    item.socket.io.on("error", (error: string) => {
      item.connection_state = "Timeout";
      item.connection_state_color = "red";
      console.error(`${item.name} error: ${error}`);
    });
  });
}

function editItem(item) {
  editedIndex.value = items.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function deleteItem(item) {
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
