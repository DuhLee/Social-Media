import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@mui/material'
import {MuiChipsInput} from 'mui-chips-input'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

import useStyles from './styles.js'
import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Pagination from '../Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [ currentId, setCurrentId ] = useState(null);
    const [ search, setSearch ] = useState('');
    const [ tags, setTags ] = useState([]);

    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const searchPost = () => {
        if(search.trim() || tags) {
            // dispatch -> fetch search post

            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));

            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }

    const handleTagsChange = (newTag) => {
        setTags(newTag)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            searchPost();
        }
    }


    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                        {
                            (!searchQuery && !tags.length) && (

                                <Paper elevation={6} className={classes.pagination}>
                                    <Pagination page={page}/>
                                </Paper>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch}  position="static" color="inherit" >
                            <TextField name="search" variant="outlined" label="제목" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} />
                            <MuiChipsInput style={{ margin: '10px 0' }} value={tags} onChange={handleTagsChange} label="태그"/>
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" >검색</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home