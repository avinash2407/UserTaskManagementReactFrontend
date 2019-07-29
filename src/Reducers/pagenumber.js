export function pagenumber(state = {}, action) {
	switch (action.type) {
		case 'GetUsersSucesspage':
			return {
				pagenum: action.pagenumber
			};
		default:
			return state;
	}
}
