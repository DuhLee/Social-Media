import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles.js';
import { createPost, updatePost } from '../../actions/posts.js';


// Get Current ID


const Form = ({ currentId, setCurrentId }) => {
    
    const history = useHistory();
    const [ postData, setPostData ] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId ) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name}, history));
        }
        clear();
    }
    
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    }
    
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} >
                <Typography variant="h6" align="center" >
                    Please Sign In
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant='h6'> 포스트 {currentId ? '수정하기' : '올리기' }</Typography>

                <TextField name="title" variant='outlined' label='제목' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant='outlined' label='내용' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant='outlined' label='태그' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" value={postData.selectedFile} multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>

                <Button className={`${classes.buttonSubmit}`} variant="contained" color="primary" size="large" type="submit" fullWidth >등록</Button>
                <Button variant="contained" color="secondary" size="small" onClick={ clear } fullWidth >지우기</Button>
            </form>
        </Paper>
    )
}

export default Form