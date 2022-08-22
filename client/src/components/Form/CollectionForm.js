import React, {useState} from 'react'
import { FormattedMessage } from "react-intl";
import { useDispatch } from 'react-redux'
import { PickerOverlay } from "filestack-react";
import { createCollection } from '../../actions/collections'

export default function CollectionForm() {
    const [isPicker, setIsPicker] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [collectionImage, setCollectionImage] = useState('');

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCollection({ collectionName, topic, description, collectionImage, name: user?.result?.name }));
        setCollectionName('');
        setTopic('');
        setDescription('');
        setCollectionImage('');
    }

    return (
        <>
            <h2><FormattedMessage id="createCollection.text"/></h2>
            {collectionImage ? (
                <img
                    src={collectionImage && collectionImage.filesUploaded[0].url}
                    alt="imageUploded"
                    className="collectionFormImage"
                />
            ) : (
                <button
                    onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}
                    type="button"
                    className="w-full text-lg font-bold border-dashed h-56 border-4 border-blue-800 text-blue-800"
                >
                    Choose Image
                </button>
            )}
            <form onSubmit={handleSubmit}>
                <div className="input-group gap-2">
                    <FormattedMessage id="collectionName.text">
                        {(msg) => (
                            <input
                                name="collectionName"
                                onChange={(e) => setCollectionName(e.target.value)}
                                required
                                type="text"
                                className="form-control mb-2"
                                placeholder={msg}
                                value={collectionName}
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
                                value={topic}
                            />
                        )}
                    </FormattedMessage>
                </div>
                <FormattedMessage id="description.text">
                    {(msg) => (
                        <input
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            type="text"
                            className="form-control mb-2"
                            placeholder={msg}
                            value={description}
                        />
                    )}
                </FormattedMessage>
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
