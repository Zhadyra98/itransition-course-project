import React from "react";
import { useSelector } from 'react-redux'
import { Grid, CircularProgress} from '@mui/material'

import Item from './Item/Item';

const Items = ({ setCurrentId }) => {
    const items = useSelector((state) => state.items);

    console.log(items);
    
    return (
        !items.length ? <CircularProgress/> : (
            <Grid container alignItems="stretch" spacing={3}>
                {items.map((item) => (
                    <Grid key={item._id} item xs={12} sm={6}>
                        <Item item={item} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}
export default Items;