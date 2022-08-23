import React, {useState, useEffect} from 'react'
import { FormattedMessage } from "react-intl";
import { useDispatch } from 'react-redux'
import { PickerOverlay } from "filestack-react";
import { createCollection } from '../../actions/collections'

import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCollection } from '../../actions/collections';
import { TailSpin } from  'react-loader-spinner'

export default function CollectionForm({mode}) {
    const { id } = useParams();
    const { collection, isLoading } = useSelector((state) => state.collections );
    const dispatch = useDispatch();

    const [isPicker, setIsPicker] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [collectionImage, setCollectionImage] = useState('');

    const user = JSON.parse(localStorage.getItem('profile'));
    
    useEffect(() => {
        if(id!==undefined){
            dispatch(getCollection(id));
        } 
    }, [id, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCollection({ collectionName, topic, description, collectionImage, name: user?.result?.name }));
        setCollectionName('');
        setTopic('');
        setDescription('');
        setCollectionImage('');
    }
    if(isLoading && mode==="detail"){
        return (<TailSpin color='blue'/>)
    }
    return (
        <>
            <h2>
            {collection ? collection.collectionName : <FormattedMessage id="createCollection.text"/> }
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-4">
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
                    <div className="col">
                        <FormattedMessage id="collectionName.text">
                            {(msg) => (
                                <input
                                    name="collectionName"
                                    onChange={(e) => setCollectionName(e.target.value)}
                                    required
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder={msg}
                                    value={collection?.collectionName || collectionName}
                                    disabled={collection}
                                />
                            )}
                        </FormattedMessage>
                        <FormattedMessage id="topic.text">
                            {(msg) => (
                                <input
                                    name="topic"
                                    onChange={(e) => setTopic(e.target.value)}
                                    required
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder={msg}
                                    value={collection?.topic || topic}
                                    disabled={collection}
                                />
                            )}
                        </FormattedMessage>
                        <FormattedMessage id="description.text">
                            {(msg) => (
                                <textarea
                                    name="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder={msg}
                                    value={collection?.description || description}
                                    rows={4}
                                    disabled={collection}
                                ></textarea>
                            )}
                        </FormattedMessage>
                    </div>

                </div>
                <div className="my-3">
                    <button type="submit" className='btn btn-primary btn-lg w-100'>
                        <FormattedMessage id="createCollection.button"/>
                    </button>
                </div>
                <div className="mt-4">
                    {isPicker && (
                        <PickerOverlay
                            apikey={"AUdyPRd3rS1mJm64xecW4z"}
                            onSuccess={(res) => {
                                setCollectionImage(res);
                                setIsPicker(false);
                            }}
                            onError={(res) => alert(res)}
                            pickerOptions={{
                                maxFiles: 1,
                                accept: ["image/*"],
                                errorsTimeout: 2000,
                                maxSize: 1 * 1000 * 1000,
                            }}
                        />
                    )}
                </div>
            </form>
        </>
    )
}
