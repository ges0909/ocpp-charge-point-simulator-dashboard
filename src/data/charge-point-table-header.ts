import { i18n } from '../i18n.ts'
import type { ChargePointHeader } from '../types/ChargePointHeader.ts'

const { t } = i18n.global

const charge_point_table_header: ChargePointHeader[] = [
    {
        title: t('$vuetify.header_name'),
        key: 'name',
        align: 'start',
    },
    { title: t('$vuetify.header_connectors'), key: 'connectors' },
    { title: t('$vuetify.header_connection_state'), key: 'connection_state' },
    { title: t('$vuetify.header_charging_state'), key: 'charging_state' },
    { title: t('$vuetify.header_meter_value'), key: 'meter_value' },
    { title: t('$vuetify.actions'), key: 'actions', sortable: false },
]

export { charge_point_table_header }
