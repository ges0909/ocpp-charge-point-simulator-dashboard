type ChargingState =
  | "Available"
  | "Preparing"
  | "Charging"
  | "Finishing"
  | "Reserved"
  | "Faulted"
  | "Accepted"
  | "Invalid"
  | "Blocked"
  | "Expired";

export type { ChargingState };
