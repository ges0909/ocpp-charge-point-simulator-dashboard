import { ref } from "vue";
import { backend_url } from "./data//backend_url";
import { ChargePoint } from "./types/ChargePoint";

const ws_connect = function (items: ChargePoint[]) {
  items.forEach((item: ChargePoint) => {
    item.socket = new WebSocket(backend_url + "/" + item.name);

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

export { ws_connect };
