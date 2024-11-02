const CONNECTION_STATES = [
	'CONNECTING',
	'OPEN',
	'CLOSING',
	'CLOSED',
	'ERROR',
]

type ConnectionState = typeof CONNECTION_STATES[number]

export { CONNECTION_STATES }
export type { ConnectionState }
