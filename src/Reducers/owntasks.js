export function owntasks(state = [], action) {
	switch (action.type) {
		case 'GetOwnTasks':
			return action.owntasks;
		default:
			return state;
	}
}
