export function taskpagenumber(state = {}, action) {
	switch (action.type) {
		case 'GetTasksSucesspage':
			return {
				taskpagenum: action.taskpagenumber
			};
		default:
			return state;
	}
}
