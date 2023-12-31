import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt.js';
import DeleteIcon from '@mui/icons-material/Delete.js';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz.js';
import moment from 'moment';

import useStyles from './styles.js';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';
import { ThumbUpAltOutlined } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {

    const history = useHistory();

    const classes = useStyles();

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const openPost = (e) => {
        
        e.preventDefault();

        history.push(`/posts/${post._id}`)
    };


    const Likes = () => {
        
        if( post.likes.length > 0) {
            return post.likes.find( (like) => like === ( user?.result?.googleId || user?.result?._id))
            ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />&nbsp;{ post.likes.length > 2 ? `You and ${ post.likes.length - 1 } others` : `${ post.likes.length } Like${post.likes.length > 1 ? 's' : ''}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />&nbsp;{ post.likes.length} { post.likes.length === 1 ? 'Like' : 'Likes' }
                </>
            );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
    };


    return (

        <Card className={classes.card} raised elevation={6} >
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>


                <div className={classes.details}>
                    <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                
                <Typography className={classes.title} variant='h5' gutterBottom >{post.title}</Typography>
                <CardContent>
                    <Typography variant='body2' color="textSecondary" component="p" gutterBottom >{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            {
                (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={(e) => {
                            e.preventDefault();
                            setCurrentId(post._id);
                        }} >
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )
            }

            <CardActions className={classes.cardActions} >
                <Button size="small" color="primary" onClick={() => { dispatch(likePost(post._id)) }} disabled={!user?.result} >
                    <Likes />
                </Button>

                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        
                        <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id)) }}>
                            <DeleteIcon fontSize="small" /> Delete
                        </Button>
                    )
                }
            </CardActions>
        </Card>
    )
}

export default Post