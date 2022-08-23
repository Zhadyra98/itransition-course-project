import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Collection({collection}) {
    const navigate = useNavigate();
    
    const openCollection = () => {
        navigate(`/collections/${collection._id}`);
    }
    
    return (
        <div className='collection-item-container' onClick={openCollection}>
            <div className='collection-item-image-container mx-1'>
                <img
                    className="img-fluid collection-list-img"
                    src={collection.collectionImage}
                    alt={collection.collectionName}
                />
            </div>
            <div className="collection-name-container">
                <h4>{collection.collectionName}</h4>
            </div>
        </div>

    )
}
