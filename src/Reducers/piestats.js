export function piestats(state = [], action) {
	switch (action.type) {
		case 'GetPieStats':
			return action.piestats;
		default:
			return state;
	}
}
