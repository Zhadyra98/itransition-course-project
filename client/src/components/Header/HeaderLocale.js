import React from 'react'
import locales from "../localization/locales";

export default function HeaderLocale({locale, setLocale }) {
    return (
        <select 
            className="mx-3 border-0" 
            onChange={(e) => setLocale(e.target.value)} 
            value={locale}
        >
            <option value={locales.EN}>EN</option>
            <option value={locales.RU}>RU</option>
        </select>
    )
}
