import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, LOGIN } from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		case USER_LOADED:
				
				return {
					...state,
					user: action.payload,
					isAuthenticated: true,
					loading: false,
				};
		default:
			return state;
	}
}