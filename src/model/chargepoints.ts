import { ref } from "vue";
import { i18n } from "../i18n.ts";

const { t } = i18n.global;

export const default_backend_url =
  "ws://${username}:${password}@localhost:8081/ocpp";

export const charge_point_table_header = [
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
];

export type ChargePoint = {
  name: string;
  connectors: number;
  connection_state: string;
  charging_state: any;
  meter_value: string;
  connection_state_color: any;
  socket: any;
  backend_url: string;
  username: string;
  password: string;
};

export const charge_point_table_data = [
  {
    name: "Frozen Yogurt",
    connectors: 2,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
  {
    name: "Ice cream sandwich",
    connectors: 2,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
  {
    name: "Eclair",
    connectors: 1,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
  {
    name: "Cupcake",
    connectors: 1,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
  {
    name: "Gingerbread",
    connectors: 3,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
  {
    name: "Jelly bean",
    connectors: 2,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
  {
    name: "Lollipop",
    connectors: 1,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
  {
    name: "Honeycomb",
    connectors: 1,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
  {
    name: "Donut",
    connectors: 1,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
  {
    name: "KitKat",
    connectors: 1,
    connection_state: "Close",
    charging_state: "Available",
    meter_value: "",
    connection_state_color: ref("grey"),
    socket: null,
    backend_url: default_backend_url,
    username: "test",
    password: "test",
  },
];
