export function register(state = {}, action) {
    switch (action.type) {
        case 'RegisterRequest':
            return {
                isRegistering: true
            };
        case 'RegisterSuccess':
            return {
                isRegistered: true
            };
        case 'RegisterFailure':
            return {};
        default:
            return state;
    }
}
