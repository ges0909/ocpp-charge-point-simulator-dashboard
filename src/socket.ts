import { ref } from "vue";
import { ChargePoint } from "./types/ChargePoint";

function u(strings: TemplateStringsArray, username: string, password: string) {
  return strings[0] + username + strings[1] + password + strings[2];
}

const connect = function (items: ChargePoint[]) {
  items.forEach((item: ChargePoint) => {
    const url = u`http://${item.username}:${item.password}@localhost:8081/ocpp`;
    item.socket = new WebSocket(url);

    item.socket.addEventListener("open", (event: Event) => {
      item.connection_state = ref("OPEN");
      item.connection_state_color = ref("green");
      console.log(`charge point '${item.name}', connection opened, ${event}`);
    });

    item.socket.addEventListener("close", (event: Event) => {
      item.connection_state = ref("CLOSED");
      item.connection_state_color = ref("grey");
      console.log(`charge point '${item.name}', connection closed, ${event}`);
    });

    item.socket.addEventListener("error", (event: Event) => {
      item.connection_state = ref("ERROR");
      item.connection_state_color = ref("red");
      console.error(`charge point '${item.name}', connection error, ${event}`);
    });

    item.socket.addEventListener("message", (event: Event) => {
      item.connection_state = ref("OPEN");
      console.error(`charge point '${item.name}', message received, ${event}`);
    });
  });
};

export { connect };
