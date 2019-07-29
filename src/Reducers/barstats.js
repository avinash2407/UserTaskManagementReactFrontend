export function barstats(state = [], action) {
	switch (action.type) {
		case 'GetBarStats':
			return action.barstats;
		default:
			return state;
	}
}
