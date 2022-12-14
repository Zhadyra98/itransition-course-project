import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../actions/items";
import { TailSpin } from  'react-loader-spinner'

import Item from './Item/Item';

const Items = () => {
    const { items, isLoading } = useSelector((state) => state.items);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItems());
        // eslint-disable-next-line
    },[]);

    if(!items.length && !isLoading) return "No items";
    
    return (
        isLoading ? <TailSpin color = 'blue'/> : 
        (
        !items?.length ? <TailSpin color = 'blue'/> : (
            <div>
                {items.map((item) => (
                    <div key={item._id}>
                        <Item item={item} />
                    </div>
                ))}
            </div>
        )
    ))
}
export default Items;