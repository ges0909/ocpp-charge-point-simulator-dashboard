import { i18n } from '../i18n.ts'

const { t } = i18n.global

const CHARGE_POINT_TABLE_HEADER = [
    {
        title: t('$msg.header_name'),
        key: 'name',
        width: '10%',
    },
    {
        title: t('$msg.header_connectors'),
        key: 'connectors',
        width: '5%',
    },
    {
        title: t('$msg.header_connection_state'),
        key: 'connection_state',
        width: '25%',
    },
    {
        title: t('$msg.header_charging_state'),
        key: 'charging_state',
        width: '25%',
    },
    { title: t('$msg.header_meter_value'), key: 'meter_value', width: '25%' },
    {
        title: t('$msg.actions'),
        key: 'actions',
        width: '10%',
        sortable: false,
    },
]

export { CHARGE_POINT_TABLE_HEADER }
