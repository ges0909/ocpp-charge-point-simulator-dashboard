import { Ref } from 'vue'
import type { ConnectionState } from './ConnectionState.ts'
import type { ChargingState } from './ChargingState.ts'
import type { StateColor } from './StateColor.ts'

interface ChargePoint {
	name: string
	connectors: number
	connection_state: Ref<ConnectionState>
	charging_state: Ref<ChargingState>
	meter_value: string
	connection_state_color: Ref<StateColor>
	socket: WebSocket | null
	username: string
	password: string
}

export type { ChargePoint }
