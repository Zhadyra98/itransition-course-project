import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import { FormattedMessage } from "react-intl";

export default function HeaderSearch() {
    return (
        <div className="me-auto d-flex">
            <h6 className="mx-3">Collections Management System</h6>
            <FormattedMessage id="search.text">
                {(msg) => (
                    <Form.Control
                        type="search"
                        className="me-2"
                        placeholder={msg}
                        aria-label={<FormattedMessage id="search.text" />}
                    />
                )}
            </FormattedMessage>
            <BiSearchAlt2 size={40}/>
        </div>
    )
}
