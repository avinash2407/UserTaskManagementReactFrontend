//let user = JSON.parse(localStorage.getItem('user'));
const initialState =  { isLoggedIn: false} ;
export function auth(state = initialState, action) {
    switch (action.type) {
        case 'LoginSuccess':
            return {
                isLoggedIn: true
            };
        case 'Logout':
            return {
                isLoggedIn : false
            };
        default:
            return state;
    }
}
