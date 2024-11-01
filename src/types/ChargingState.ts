const CHARGING_STATES = [
    "Available",
    "Preparing",
    "Charging",
    "Finishing",
    "Reserved",
    "Faulted",
    "Accepted",
    "Invalid",
    "Blocked",
    "Expired",
]

type ChargingState = typeof CHARGING_STATES[number]

export {CHARGING_STATES}
export type {ChargingState};
