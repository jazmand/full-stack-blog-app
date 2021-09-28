import blogService from '../services/blogs';
import loginService from '../services/login';
import createUserService from '../services/createUser';
import {setFulfilledMessage, setErrorMessage} from './notificationReducer';

const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGIN_USER': {
			return action.data;
		}
		case 'LOGOUT_USER': {
			return null;
		}
		case 'CREATE_USER': {
			return null;
		}
		default: {
			return state;
		}
	}
};

export const loginUser = () => {
	const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
	if (loggedUserJSON) {
		const user = JSON.parse(loggedUserJSON);
		blogService.setToken(user.token);
		return {
			type: 'LOGIN_USER',
			data: user,
		};
	}
	return {type: 'LOGOUT_USER'};
};

export const userLogout = () => {
	window.localStorage.removeItem('loggedBlogappUser');
	return {type: 'LOGOUT_USER'};
};

export const userLogin = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			blogService.setToken(user.token);
			dispatch(loginUser());
			dispatch(setFulfilledMessage(`${user.username} successfully logged in`));
		} catch (exception) {
			dispatch(setErrorMessage('Incorrect credentials'));
		}
	};
};

export const createUser = (userObject) => {
	return async (dispatch) => {
		try {
			const newUser = await createUserService.createUser(userObject);
			dispatch({
				type: 'CREATE_USER',
				data: newUser,
			});
			dispatch(
				setFulfilledMessage('Account successfully created, please log-in')
			);
		} catch (exception) {
			dispatch(
				setErrorMessage(
					'Username must be unique, password must be longer than 3 characters, and all fields must be filled in'
				)
			);
		}
	};
};

export default userReducer;
