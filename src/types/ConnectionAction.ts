const CONNECTION_ACTIONS = [
    'OPEN',
    'CLOSE',
]

type ConnectionState = typeof CONNECTION_ACTIONS[number]

export { CONNECTION_ACTIONS }
export type { ConnectionState }