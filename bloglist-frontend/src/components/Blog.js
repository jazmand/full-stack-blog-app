import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {likeBlog, deleteBlog, addComment} from '../reducers/blogReducer';
import {
	setFulfilledMessage,
	setErrorMessage,
} from '../reducers/notificationReducer';
import blogService from '../services/blogs';

import {TextField, Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const Blog = ({blog}) => {
	if (!blog) return <p>Loading...</p>;

	const dispatch = useDispatch();
	const history = useHistory();
	const currentUserName = useSelector((state) => state.user.name);
	const [allowRemove, setAllowRemove] = useState(false);

	useEffect(() => {
		const user = blogService.getUserInfo();
		const blogUser = blog.user.id || blog.user;
		setAllowRemove(blogUser === user.id);
	}, []);

	const addLike = () => {
		try {
			dispatch(likeBlog(blog.id, blog.likes + 1));
			dispatch(setFulfilledMessage('Like added'));
		} catch (error) {
			dispatch(setErrorMessage(error));
		}
	};

	const removeBlog = () => {
		const result = window.confirm(`Remove ${blog.title} by ${blog.author}?`);
		if (result) {
			try {
				dispatch(setFulfilledMessage('Blog deleted'));
				dispatch(deleteBlog(blog.id));
				history.push('/');
			} catch (error) {
				dispatch(setErrorMessage(error));
			}
		}
	};

	const createComment = (e) => {
		e.preventDefault();
		dispatch(addComment(blog.id, currentUserName, e.target.comment.value));
		e.target.comment.value = '';
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	}));
	const classes = useStyles();
	const externalLink = `https://${blog.url}`;
	return (
		<div>
			<h1 className='title'>{blog.title}</h1>
			<div className='info'>
				<Typography underline='hover' variant='h6'>
					<a
						href={externalLink}
						target='_blank'
						rel='noreferrer'
						style={{textDecoration: 'none'}}
					>
						{blog.url}
					</a>
				</Typography>
				<Typography variant='h6' className={classes.root}>
					<span className='likes'>{blog.likes} likes</span>
					<Button
						className='like'
						onClick={addLike}
						variant='contained'
						color='primary'
						size='small'
					>
						Like
					</Button>
				</Typography>
				<Typography className='author'>added by {blog.author}</Typography>
				{allowRemove && (
					<button className='remove' onClick={removeBlog}>
						remove
					</button>
				)}
			</div>
			<div className='comments'>
				<h2>Comments</h2>
				<form onSubmit={createComment} className={classes.root}>
					<TextField
						label='Add Comment'
						variant='outlined'
						type='text'
						name='comment'
					/>
					<div>
						<Button type='submit' variant='contained' color='primary'>
							Submit
						</Button>
					</div>
				</form>
				<ul className='comments-section'>
					{blog.comments.length > 0 ? (
						blog.comments.map((commentData) =>
							<li key={`${commentData.user}-${commentData.comment}`}>
								<Typography variant='body1' style={{fontWeight: 'bold'}}>
									{commentData.user}
								</Typography>
								<Typography variant='body2'>
									{commentData.comment}
								</Typography>
							</li>
						)
					) : (
						<Typography variant='body1'>
							No Comments
						</Typography>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Blog;
