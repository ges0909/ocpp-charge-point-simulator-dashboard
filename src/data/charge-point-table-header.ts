import {i18n} from "../i18n"
import {ChargePointHeader} from "../types/ChargePointHeader";

const { t } = i18n.global;

const charge_point_table_header: ChargePointHeader[] = [
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

export {charge_point_table_header};