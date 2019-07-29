export function users(state = [], action) {
	switch (action.type) {
		case 'GetUsersSuccess':
			return action.users;
		default:
			return state;
	}
}
