import React, { useState } from "react";
import { Container } from 'react-bootstrap'
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
// // import ItemDetails from "./components/ItemDetails/ItemDetails";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IntlProvider } from "react-intl";
import locales from './components/localization/locales';
import enMessages from './components/localization/en.json';
import ruMessages from './components/localization/ru.json';
// import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
// export const ThemeContext = createContext(null);

const messages = {
    [locales.EN]: enMessages,
    [locales.RU]: ruMessages,
};

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [locale, setLocale] = useState(localStorage.getItem('app.locale') || locales.EN);
    const [ theme, setTheme ] = useState(localStorage.getItem('app.theme') || "dark");

    const setCustomLocale = (selectedLocale) => {
        setLocale(selectedLocale);
        localStorage.setItem('app.locale', selectedLocale);
    }

    const toggleTheme = () => {
        const finalTheme = theme === "light" ? "dark" : "light"
        setTheme (finalTheme);
        localStorage.setItem('app.theme', finalTheme);
    }
    return (
        // <BrowserRouter>
        //     <Container maxWidth="xl">
        //         <Navbar/>
        //         <Routes>
        //             <Route path="/" exact element={<Navigate  to="/items" />}/>
        //             <Route path= "/items" exact element={<Home/>}/>
        //             <Route path= "/items/search" exact element={<Home/>}/>
        //             <Route path= "/items/:id" exact element={<ItemDetails/>}/>
        //             <Route path="/auth" exact element = {!user ? <Auth/> : <Navigate  to="/items" />}/>
        //         </Routes>
        //     </Container>
        // </BrowserRouter>

            <div className="App" id={theme}>
                <IntlProvider locale={locale} messages={messages[locale]}>
                    <BrowserRouter>
                        <Header 
                            locale={locale}
                            setLocale={setCustomLocale}
                            toggleTheme={toggleTheme}
                            theme={theme}
                        />
                        <Container>
                            <Routes>
                                <Route path="/auth" exact element = {!user ? <Auth/> : <Navigate  to="/items" />}/>
                            </Routes>
                        </Container>
                    </BrowserRouter>
                </IntlProvider>
            </div>
    )
}

export default App;