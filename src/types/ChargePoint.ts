import { Ref } from 'vue'
import type { ConnectionState } from './ConnectionState.ts'
import type { ChargingState } from './ChargingState.ts'
import type { StateColor } from './StateColor.ts'

interface ChargePoint {
    name: string
    connectors: number

    connection_state_requested: string | null
    connection_state_confirmed: Ref<ConnectionState> | null

    charging_state_requested: string | null
    charging_state_confirmed: Ref<ChargingState> | null

    meter_value_requested: number | null
    meter_value_confirmed: Ref<number> | null

    connection_state_color: Ref<StateColor>

    socket: WebSocket | null
    backend_url: string
    username: string
    password: string
}

export type { ChargePoint }
