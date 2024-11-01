import { Ref } from "vue";
import { ConnectionState } from "./ConnectionState";
import { ChargingState } from "./ChargingState";
import { StateColor } from "./StateColor";

interface ChargePoint {
  name: string;
  connectors: number;
  connection_state: Ref<ConnectionState>;
  charging_state: Ref<ChargingState>;
  meter_value: string;
  connection_state_color: Ref<StateColor>;
  socket: WebSocket | null;
  username: string;
  password: string;
}

export type { ChargePoint };
