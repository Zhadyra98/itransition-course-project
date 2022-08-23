import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from "../../actions/collections";
import Carousel from 'react-elastic-carousel'
import { TailSpin } from  'react-loader-spinner'
import Collection from "./Collection.js/Collection";


export default function Collections() {
    const { collections, isLoading } = useSelector((state) => state.collections);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCollections());
        // eslint-disable-next-line
    },[]);

    const handleCreateCollection = () => {
        navigate('/collections/createCollection');
    }
    if(!collections.length && !isLoading) return "No Collections";
    return (
        <div className="container-fluid">
            {isLoading ? <TailSpin color = 'blue'/> : 
            (
            !collections?.length ? <TailSpin color = 'blue'/> : (
                <div>
                    <h2 className="mb-4">MY Collections</h2>
                    <Carousel itemsToShow={3}>
                        {collections.map((collection) => (
                            <Collection key={collection._id} collection={collection}/>
                        ))}
                        <div onClick={handleCreateCollection} className="collection-plus-container text-center border bg-light mx-1">
                            <p className="collections-add-sign text-secondary">+</p>
                        </div>
                    </Carousel>
                </div>
            )
            )}
        </div>
    )

}

