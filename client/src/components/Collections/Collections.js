import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from "../../actions/collections";
import Carousel from 'react-elastic-carousel'
import { TailSpin } from  'react-loader-spinner'

export default function Collections() {
    const { collections, isLoading } = useSelector((state) => state.collections);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCollections());
        console.log("collections.length--->"+ collections.length)
        // eslint-disable-next-line
    },[]);

    const handleCreateCollection = () => {
        navigate('/collections/createCollection');
    }

    return (
        <>
            <h2>MY Collections</h2>
            {isLoading ? <TailSpin color = 'blue'/> : 
            (
                <Carousel itemsToShow={4}>
                    <div>1</div>
                    <div onClick={handleCreateCollection}>+</div>
                </Carousel>
            )}
        </>
    )
}
