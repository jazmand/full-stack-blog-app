import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';

const CreateUserForm = ({createUser}) => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleCreateUser = (event) => {
		event.preventDefault();
		createUser({
			name,
			username,
			password,
		});
		setName('');
		setUsername('');
		setPassword('');
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	}));
	const classes = useStyles();

	return (
		<div className='blogFormDiv'>
			<form onSubmit={handleCreateUser} className={classes.root}>
				<div>
					<TextField
						label='Name'
						variant='outlined'
						id='name'
						value={name}
						name='name'
						onChange={({target}) => setName(target.value)}
					/>
				</div>
				<div>
					<TextField
						label='Username'
						variant='outlined'
						id='username'
						value={username}
						name='username'
						onChange={({target}) => setUsername(target.value)}
					/>
				</div>
				<div>
					<TextField
						label='Password'
						variant='outlined'
						id='password'
						value={password}
						name='url'
						type='password'
						onChange={({target}) => setPassword(target.value)}
					/>
				</div>
				<Button
					id='create-user'
					type='submit'
					variant='contained'
					color='primary'
				>
					Create
				</Button>
			</form>
		</div>
	);
};

export default CreateUserForm;
