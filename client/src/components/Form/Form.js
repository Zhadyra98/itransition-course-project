import React, {useState, useEffect} from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux'
import { createItem, updateItem } from '../../actions/items'


const Form = ({ currentId, setCurrentId }) => {
    const [ itemData, setItemData ] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    })
    const item = useSelector((state) => currentId ? state.items.find((p) => p._id == currentId) : null);

    const dispatch = useDispatch();

    useEffect(() => {
        if(item) setItemData(item);
    }, [item])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updateItem(currentId, itemData))
        } else {
            dispatch(createItem(itemData))
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setItemData({ creator: '', title: '', message: '', tags: '', selectedFile: ''});
    }

    return (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} an item</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator"
                    fullWidth
                    value={itemData.creator} 
                    onChange={(e) => setItemData({ ...itemData, creator: e.target.value })}
                />
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title"
                    fullWidth
                    value={itemData.title} 
                    onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message"
                    fullWidth
                    value={itemData.message} 
                    onChange={(e) => setItemData({ ...itemData, message: e.target.value })}
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags"
                    fullWidth
                    value={itemData.tags} 
                    onChange={(e) => setItemData({ ...itemData, tags: e.target.value })}
                />
                <div>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setItemData({ ...itemData, selectedFile: base64 })}
                    />
                </div>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}
export default Form;