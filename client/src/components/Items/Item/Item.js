import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteItem, likeItem  } from "../../../actions/items";

const Item = ({ item, setCurrentId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const naviagte = useNavigate();
    const [ likes, setLikes ] = useState(item?.likes);

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedItem = item.likes.find((like) => like === userId);
    
    const handleLike = () => {
        dispatch(likeItem(item._id));
        if(hasLikedItem) {
            setLikes(item.likes.filter((id) => id !== userId));
        } else {
            setLikes([...item.likes, userId]);
        }
    }

    const Likes = () => {
        if(likes.length > 0) {
            return likes.find((like) => like === userId)
            ? (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            ) : (
                <><ThumbUpOffAltIcon fontSize="small"/> &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }
        return <><ThumbUpOffAltIcon fontSize="small"/>&nbsp;Like</>
    }

    const openItem = () => {
        naviagte(`/items/${item._id}`);
    }
    return (
        <Card>  
            <ButtonBase onClick={openItem}>
                <CardMedia image={item.selectedFile} title={item.title}/>
                <div>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">{moment(item.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === item?.creator || user?.result?._id === item?.creator) && (
                    <div>
                        <Button size="small" onClick={() => setCurrentId(item._id)}>
                            <ModeEditOutlineIcon />
                        </Button>
                    </div>
                )}
                <div>
                    <Typography variant="body2" color="textSecondary">{item.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography variant="h5" gutterBottom>{item.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{item.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike }>
                    <Likes/>
                </Button>
                {(user?.result?.googleId === item?.creator || user?.result?._id === item?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deleteItem(item._id)) }>
                        <DeleteIcon fontSize="small"/>
                        Delete
                    </Button>
                )}

            </CardActions>
        </Card>
    )
}
export default Item;