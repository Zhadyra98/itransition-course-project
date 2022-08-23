import React, {useState, useEffect} from 'react'
import { FormattedMessage } from "react-intl";
import { useDispatch } from 'react-redux'
import { createCollection } from '../../actions/collections'

import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCollection } from '../../actions/collections';
import { TailSpin } from  'react-loader-spinner'
import CollectionFormImg from './CollectionFormImg';
import CollectionFormFields from './CollectionFormFields';
import CollectionFormImgUploader from './CollectionFormImgUploader';

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
        if(id){
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
        <div className='container'>
            <h2>
            {collection ? collection.collectionName : <FormattedMessage id="createCollection.text"/> }
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <CollectionFormImg
                        collection={collection}
                        collectionImage={collectionImage}
                        isPicker={isPicker}
                        setIsPicker={setIsPicker}
                    />
                    <CollectionFormFields
                        setCollectionName={setCollectionName}
                        collection={collection}
                        collectionName={collectionName}
                        setTopic={setTopic}
                        topic={topic}
                        description={description}
                        setDescription={setDescription}
                    />
                </div>
                <div className="my-3">
                    {!collection && <button type="submit" className='btn btn-primary btn-lg w-100'>
                        <FormattedMessage id="createCollection.button"/>
                    </button> 
                    }
                </div>
                <CollectionFormImgUploader 
                    isPicker = {isPicker}
                    setIsPicker={setIsPicker}
                    setCollectionImage={setCollectionImage}
                />
            </form>
        </div>
    )
}
