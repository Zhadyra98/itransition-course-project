import React from 'react'
import { FormattedMessage } from "react-intl";

export default function CollectionFormFields({topic, description, collection, collectionName, setTopic, setDescription, setCollectionName}) {
    return (
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
    )
}
