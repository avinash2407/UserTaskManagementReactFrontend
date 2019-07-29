export function task(state = {}, action) {
	switch (action.type) {
		case 'GetTaskId':
			return action.task;
		default:
			return state;
	}
}
