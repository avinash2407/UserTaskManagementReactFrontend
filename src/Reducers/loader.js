const initialState =  { isLoading: false };
export function loader(state = initialState, action) {
    switch (action.type) {
        case 'loading':
            return {
                isLoading: true
            };
        case 'loadfinished':
            return {
                isLoading : false
            };
        default:
            return state;
    }
}
