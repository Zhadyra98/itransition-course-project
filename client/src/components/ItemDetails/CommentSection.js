import React, { useState, useRef } from "react";
import { TextField, Typography, Button } from '@mui/material'
import { useDispatch  } from "react-redux";
import { commentItem } from '../../actions/items'

const CommentSection = ({ item }) => {
    const [ comments, setComments ] = useState(item?.comments);
    const [ comment, setComment ] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleClick = async () => {
        const finalComment = `${user.result.name} :  ${comment}`;
        const newComments = await dispatch(commentItem(finalComment, item._id));
        setComments(newComments);
        setComment('');
    }

    return (
        <div>
            <div>
                <div>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(":")[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                </div>
                { user?.result?.name && (
                    <div style={{width: '70%'}}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button 
                            style={{marginTop: '10px'}} 
                            fullWidth 
                            disabled={!comment} 
                            variant="contained" 
                            onClick={handleClick}
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;