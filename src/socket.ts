import { ChargePoint } from "./model/chargepoints.ts";

function u(strings: TemplateStringsArray, username: string, password: string) {
  return strings[0] + username + strings[1] + password + strings[2];
}

export function connect(items: ChargePoint[]) {
  items.forEach((item: ChargePoint) => {
    const url = u`http://${item.username}:${item.password}@localhost:8081/ocpp`;
    item.socket = new WebSocket(url);

    item.socket.addEventListener("open", (event: Event) => {
      item.connection_state = "Open";
      item.connection_state_color = "green";
      console.log(`charge point '${item.name}', connection opened, ${event}`);
    });

    item.socket.addEventListener("close", (event: Event) => {
      item.connection_state = "Close";
      item.connection_state_color = "grey";
      console.log(`charge point '${item.name}', connection closed, ${event}`);
    });

    item.socket.addEventListener("error", (event: Event) => {
      item.connection_state = "Error";
      item.connection_state_color = "red";
      console.error(`charge point '${item.name}', connection error, ${event}`);
    });

    item.socket.addEventListener("message", (event: Event) => {
      console.error(`charge point '${item.name}', message received, ${event}`);
    });
  });
}
