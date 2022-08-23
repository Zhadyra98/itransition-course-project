import React from 'react'
import { PickerOverlay } from "filestack-react";

export default function CollectionFormImgUploader({isPicker, setCollectionImage, setIsPicker}) {
    return (
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
    )
}
