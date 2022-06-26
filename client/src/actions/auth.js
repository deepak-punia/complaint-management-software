import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	LOGIN,
	API_ENDPOINT
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Logout user
export const logout = () => (dispatch) => {
	setAuthToken();
	
	dispatch({
		type: LOGOUT,
	});
	
	dispatch(setAlert("Logged out.", "success","app"));
};

//Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const response = await axios.get(`${API_ENDPOINT}/api/login`);

		dispatch({
			type: USER_LOADED,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

//Register User
export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const body = JSON.stringify({ name, email, password });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const response = await axios.post(
				`${API_ENDPOINT}/api/users`,
				body,
				config
			);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: response.data,
			});
			dispatch(setAlert("Register Successfull! Please Login", "success","register"));
		} catch (error) {
			console.log(error);
			dispatch(setAlert("Register Failed! Please try again", "danger","register"));
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

//Login User
export const login =
	({ email, password }) =>
	async (dispatch) => {
		const body = JSON.stringify({  email, password });
		console.log("ok")
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const response = await axios.post(
				`${API_ENDPOINT}/api/login`,
				body,
				config
			);

			dispatch({
				type: LOGIN,
				payload: response.data,
			});
			dispatch(loadUser());
		} catch (error) {

			console.log(error)
			error.response.data.errors.forEach(item=>{
				dispatch(setAlert(item.msg, "danger", "login"));
			})
			
			dispatch({
				type: AUTH_ERROR,
			});
		}
	};