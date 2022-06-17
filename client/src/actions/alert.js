import { SET_ALERT, REMOVE_ALERT } from "./types";
import {v4} from "uuid";

export const setAlert = (msg, alertType,componentName) => (dispatch) => {
	const id = v4();
	dispatch({
		type: SET_ALERT,
		payload: {
			msg,
			alertType,
			componentName,
			id,
		},
	});
	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};