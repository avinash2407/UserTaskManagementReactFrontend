export function assigneeuser(state = {}, action) {
	switch (action.type) {
		case 'AssigneeStore':
			return action.assigneeuser;
		default:
			return state;
	}
}
