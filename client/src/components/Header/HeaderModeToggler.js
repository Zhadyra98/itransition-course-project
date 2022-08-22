import React from 'react'
import Form from 'react-bootstrap/Form';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

export default function HeaderModeToggler({ toggleTheme, theme }) {
    return (
        <div className='my-auto'>
        {theme === "light" ? <MdDarkMode onClick={toggleTheme} size={30} /> : <MdLightMode onClick={toggleTheme} size={30} />}
        </div>
    )
}
