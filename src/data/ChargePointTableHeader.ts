import { i18n } from '../i18n.ts'
import type { VDataTableHeaders } from 'vuetify/components'

const { t } = i18n.global

const CHARGE_POINT_TABLE_HEADER: VDataTableHeaders = [
    {
        title: t('$msg.header_name'),
        key: 'name',
        width: '10%',
        align: 'start',
    },
    {
        title: t('$msg.header_connectors'),
        key: 'connectors',
        width: '5%',
        align: 'start',
    },
    {
        title: t('$msg.header_connection_state'),
        key: 'connection_state',
        width: '25%',
        align: 'start',
    },
    {
        title: t('$msg.header_charging_state'),
        key: 'charging_state',
        width: '25%',
        align: 'start',
    },
    { title: t('$msg.header_meter_value'), key: 'meter_value', width: '25%' },
    {
        title: t('$msg.actions'),
        key: 'actions',
        width: '10%',
        align: 'center',
        sortable: false,
    },
]

export { CHARGE_POINT_TABLE_HEADER }
