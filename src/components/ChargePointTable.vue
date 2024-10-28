<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <!-- table columns -->

    <template v-slot:item.connected="{ item }">
      <div class="text-begin">
        <v-chip
          :color="item.connected ? 'green' : 'red'"
          :text="
            item.connected ? t('message.connected') : t('message.disconnected')
          "
          class="text-uppercase"
          size="small"
          label
        ></v-chip>
      </div>
    </template>

    <!-- add item dialog -->

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ $t("message.title") }}
        </v-toolbar-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              {{ $t("message.add") }}
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
                    :label="t('message.header_name')"
                  ></v-text-field>
                </v-row>
                <v-row cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="editedItem.backendUrl"
                    :label="t('message.header_backend_url')"
                  ></v-text-field>
                </v-row>
                <v-row cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="editedItem.connectors"
                    :label="t('message.header_connectors')"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                {{ $t("message.cancel") }}
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                {{ $t("message.ok") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- delete item dialog -->

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">
              {{ $t("message.remove") }}
            </v-card-title>
            <v-card-actions>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                {{ $t("message.cancel") }}
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
              >
                {{ $t("message.ok") }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, nextTick, ref, watch, Ref } from "vue";

const { t } = useI18n();
const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref([
  {
    title: t("message.header_name"),
    key: "name",
    align: "start",
  },
  { title: t("message.header_connectors"), key: "connectors" },
  { title: t("message.header_connection_state"), key: "connected" },
  { title: t("message.actions"), key: "actions", sortable: false },
]);
const items: Ref = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  backendUrl: "http://localhost:3000",
  connectors: 1,
});
const defaultItem = ref({
  name: "",
  backendUrl: "http://localhost:3000",
  connectors: 1,
});
const formTitle = computed(() => {
  return editedIndex.value === -1
    ? t("message.title_add")
    : t("message.title_edit");
});

function initialize() {
  items.value = [
    {
      name: "Frozen Yogurt",
      connectors: 2,
      backendUrl: "http://localhost:3000",
      connected: true,
    },
    {
      name: "Ice cream sandwich",
      connectors: 2,
      backendUrl: "http://localhost:3000",
      connected: true,
    },
    {
      name: "Eclair",
      connectors: 1,
      backendUrl: "http://localhost:3000",
      connected: false,
    },
    {
      name: "Cupcake",
      connectors: 1,
      backendUrl: "http://localhost:3000",
      connected: true,
    },
    {
      name: "Gingerbread",
      connectors: 3,
      backendUrl: "http://localhost:3000",
      connected: true,
    },
    {
      name: "Jelly bean",
      connectors: 2,
      backendUrl: "http://localhost:3000",
      connected: true,
    },
    {
      name: "Lollipop",
      connectors: 1,
      backendUrl: "http://localhost:3000",
      connected: false,
    },
    {
      name: "Honeycomb",
      connectors: 1,
      backendUrl: "http://localhost:3000",
      connected: true,
    },
    {
      name: "Donut",
      connectors: 1,
      backendUrl: "http://localhost:3000",
      connected: true,
    },
    {
      name: "KitKat",
      connectors: 1,
      backendUrl: "http://localhost:3000",
      connected: true,
    },
  ];
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
