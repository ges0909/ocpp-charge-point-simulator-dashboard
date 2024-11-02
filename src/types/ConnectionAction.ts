const CONNECTION_ACTIONS = [
	'Open',
	'Close',
]

type ConnectionState = typeof CONNECTION_ACTIONS[number]

export { CONNECTION_ACTIONS }
export type { ConnectionState }
