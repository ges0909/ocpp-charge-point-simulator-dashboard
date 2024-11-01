import { Ref } from "vue";
import { ConnectionState } from "./ConnectionState.ts";
import { ChargingState } from "./ChargingState.ts";
import { StateColor } from "./StateColor.ts";

interface ChargePoint {
  name: string;
  connectors: number;
  connection_state: Ref<ConnectionState>;
  charging_state: Ref<ChargingState>;
  meter_value: string;
  connection_state_color: Ref<StateColor>;
  socket: WebSocket | null;
  backend_url: string;
  username: string;
  password: string;
}

export type { ChargePoint };
