import React from 'react'

export default function CollectionFormImg({collection, collectionImage, isPicker, setIsPicker}) {
    return (
        <div className="col text-center" >
            {collection ? (
                <img
                    className="img-fluid collection-list-img"
                    src={collection.collectionImage}
                    alt={collection.collectionName}
                    style={{maxWidth : "100%", maxHeight: "320px"}}
                />
            ) :
            (
            collectionImage ? (
                <img
                    src={collectionImage && collectionImage.filesUploaded[0].url}
                    alt="imageUploded"
                    style={{maxWidth : "100%", maxHeight: "320px"}}
                />
            ) : (
                <button
                    style={{minWidth : "100%", minHeight: "320px"}}
                    onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}
                    type="button"
                    className="bg-white border-7 border-primary text-primary"
                >
                    Choose Image
                </button>
            )) }
        </div>
    )
}
