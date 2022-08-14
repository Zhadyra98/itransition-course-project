import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import { useDispatch } from 'react-redux'

import { deleteItem, likeItem  } from "../../../actions/items";

const Item = ({ item, setCurrentId }) => {

    const dispatch = useDispatch();
    return (
        <Card>  
            <CardMedia image={item.selectedFile} title={item.title}/>
            <div>
                <Typography variant="h6">{item.creator}</Typography>
                <Typography variant="body2">{moment(item.createdAt).fromNow()}</Typography>
            </div>
            <div>
                <Button size="small" onClick={() => setCurrentId(item._id)}>
                    <MoreHorizIcon fontSize="default"/>
                </Button>
            </div>
            <div>
                <Typography variant="body2" color="textSecondary">{item.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography variant="h5" gutterBottom>{item.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{item.message}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => dispatch(likeItem(item._id)) }>
                    <ThumbUpAltIcon fontSize="small"/>
                    Like
                    {item.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deleteItem(item._id)) }>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}
export default Item;