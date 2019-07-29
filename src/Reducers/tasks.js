export function tasks(state = [], action) {
	switch (action.type) {
		case 'GetTasksSuccess':
			return action.tasks;
		default:
			return state;
	}
}
