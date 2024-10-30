import { io } from "socket.io-client";
import { ChargePoint } from "./model/chargepoints";

export function connect(items: ChargePoint[]) {
  items.forEach((item: ChargePoint) => {
    let auth = btoa(`${item.username}:${item.password}`);

    item.socket = io(item.backend_url, {
      transports: ["websocket"],
      autoConnect: true,
      timeout: 20_000, // timeout in ms for connection attempt
      extraHeaders: {
        authorization: `Basic ${auth}`,
      },
    });

    item.socket.on("connect", () => {
      item.connection_state = "Connected";
      item.connection_state_color = "green";
      console.log(`${item.name} connected`);
    });

    item.socket.io.on("ping", () => {
      item.connection_state = "Connected";
      item.connection_state_color = "green";
      console.log(`${item.name} ping`);
    });

    item.socket.on("disconnect", (reason: string, detail: string) => {
      item.connection_state = "Disconnected";
      item.connection_state_color = "orange";
      console.log(`${item.name} disconnect: reason ${reason}, ${detail}`);
    });

    item.socket.io.on("error", (error: string) => {
      item.connection_state = "Timeout";
      item.connection_state_color = "red";
      console.error(`${item.name} error: ${error}`);
    });
  });
}
