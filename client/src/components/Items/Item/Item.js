import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
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
                <><FaThumbsUp fontSize="small"/>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            ) : (
                <><FaThumbsDown fontSize="small"/> &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }
        return <><FaThumbsDown fontSize="small"/>&nbsp;Like</>
    }

    const openItem = () => {
        naviagte(`/items/${item._id}`);
    }
    return (
        <div>  
            <div onClick={openItem}>
                {/* <CardMedia image={item.selectedFile} title={item.title}/> */}
                <div>
                    <h6>{item.name}</h6>
                    <p>{moment(item.createdAt).fromNow()}</p>
                </div>
                {(user?.result?.googleId === item?.creator || user?.result?._id === item?.creator) && (
                    <div>
                        <button onClick={() => setCurrentId(item._id)}>
                            <FaPencilAlt />
                        </button>
                    </div>
                )}
                <div>
                    <p>{item.tags.map((tag) => `#${tag} `)}</p>
                </div>
                <h5>{item.title}</h5>
                <div>
                    <p>{item.message}</p>
                </div>
            </div>
            <div>
                <button disabled={!user?.result} onClick={handleLike }>
                    <Likes/>
                </button>
                {(user?.result?.googleId === item?.creator || user?.result?._id === item?.creator) && (
                    <button onClick={() => dispatch(deleteItem(item._id)) }>
                        <MdDelete fontSize="small"/>
                        Delete
                    </button>
                )}
            </div>
        </div>
    )
}
export default Item;