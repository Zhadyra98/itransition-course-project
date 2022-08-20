import React from 'react'
import Form from 'react-bootstrap/Form';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

export default function HeaderModeToggler({ toggleTheme, theme }) {
    return (
        <Form.Check 
            className="my-auto"
            type="switch"
            id="custom-switch"
            label = {theme === "dark" ? <MdDarkMode/> : <MdLightMode/>}
            onChange={toggleTheme}
            checked={theme === "dark"}
        />
    )
}
