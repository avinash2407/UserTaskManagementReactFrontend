export function deletecheck(state = {}, action) {
	switch (action.type) {
		case 'DeleteSuccess':
			return {
				deleted: true
			};
		default:
			return state;
	}
}
