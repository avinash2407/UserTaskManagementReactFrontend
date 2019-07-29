export function statustask(state = {}, action) {
	switch (action.type) {
		case 'GetStatusTaskId':
			return action.statustask;
		default:
			return state;
	}
}
