import React, {useEffect} from 'react'
import { Paper, CircularProgress, Typography, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { getItem } from '../../actions/items';
import CommentSection from './CommentSection';

export default function ItemDetails() {
    const { item, items, isLoading } = useSelector((state) => state.items );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect (() => {
        dispatch(getItem(id));
    }, [id])

    if(!item) return null;

    if(isLoading){
        return (<Paper elevation={6} >
            <CircularProgress size="7em"/>
        </Paper>)
    }
    return (
        <Paper elevation={6}>
            <div>
                <div>
                    <Typography variant="h3" component="h2">{item.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{item.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{item.message}</Typography>
                    <Typography variant="h6">Created by: {item.name}</Typography>
                    <Typography variant="body1">{moment(item.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection item = {item} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                {/* <div>
                    <img src={item.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={item.title} />
                </div> */}
            </div>
        </Paper>
    )
}
