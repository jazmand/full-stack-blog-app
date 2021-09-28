import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {userLogout} from '../reducers/userReducer';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';

const Navigation = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const history = useHistory();

	const handleLogout = () => {
		dispatch(userLogout());
		history.push('/');
	};
	const handleCreateUser = () => {
		history.push('/create-account');
	};
	const handleLogin = () => {
		history.push('/login');
	};

	const useStyles = makeStyles((theme) => ({
		title: {
			flexGrow: 1,
		},
		rightButton: {
			marginLeft: theme.spacing(2),
		},
		link: {
			textDecoration: 'none',
			color: '#fff',
			paddingRight: '1em',
		},
		loggedText: {
			color: 'grey',
		},
	}));

	const classes = useStyles();

	return (
		<div>
			<AppBar position='static'>
				<Toolbar>
					{user !== null ? (
						<>
							<Typography variant='h6' className={classes.title}>
								<Link className={classes.link} to='/'>
									Blogs
								</Link>
								<Link className={classes.link} to='/users'>
									Users
								</Link>
							</Typography>
							<Typography variant='overline' className={classes.loggedText}>
								{user.name} logged in
							</Typography>
							<Button
								variant='outlined'
								color='secondary'
								className={classes.rightButton}
								onClick={handleLogout}
							>
								Logout
							</Button>
						</>
					) : (
						<>
							<Typography variant='h5' className={classes.title}>
								Blog App
							</Typography>
							<Button
								variant='outlined'
								className={classes.rightButton}
								color='secondary'
								onClick={handleLogin}
							>
								Login
							</Button>
							<Button
								variant='outlined'
								className={classes.rightButton}
								color='secondary'
								onClick={handleCreateUser}
							>
								Create New Account
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navigation;
