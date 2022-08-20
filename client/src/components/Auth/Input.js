import React from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export default function Input({ half, name, handleChange, type, label, autoFocus, handleShowPassword }) {
    return (
        <div className="input-group">
            <input
                name={name}
                onChange={handleChange}
                required
                autoFocus={autoFocus}
                type={type}
                className="form-control mb-2"
                placeholder={label}
            />
            {name === 'password' ? (
            <div className='input-group-btn'>
                <button className='btn btn-outline-primary' onClick={handleShowPassword}>
                    {type === 'password' ? <MdVisibilityOff /> : <MdVisibility/>}
                </button>
            </div>
            ):null}
        </div>
    )
}
