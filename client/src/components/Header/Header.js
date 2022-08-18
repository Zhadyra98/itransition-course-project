import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import locales from "../localization/locales";
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { FormattedMessage } from "react-intl";

const Header = ({ locale, setLocale, toggleTheme, theme }) => {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'});
        navigate("/");
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
// eslint-disable-next-line
    }, [location]);

    return(
            <>
              <Navbar bg="light" expand="md" className="mb-3">
                <Container fluid>
                  <Navbar.Brand href="#">Collection</Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                  >
                    <Offcanvas.Body>
                      <Form className="d-flex">
                        <FormattedMessage id="search.text">
                          {(msg) => (
                            <Form.Control
                              type="search"
                              placeholder={msg}
                              className="me-2"
                              aria-label={<FormattedMessage id="search.text" />}
                            />
                          )}
                        </FormattedMessage>
                        <BiSearchAlt2 
                        size={40}/>
                        <select 
                          className="mx-3 border-0" 
                          onChange={(e) => setLocale(e.target.value)} 
                          value={locale}
                        >
                          <option value={locales.EN}>EN</option>
                          <option value={locales.RU}>RU</option>
                      </select>
                        <Form.Check 
                          className="my-auto"
                          type="switch"
                          id="custom-switch"
                          label = {theme === "dark" ? <MdDarkMode/> : <MdLightMode/>}
                          onChange={toggleTheme}
                          checked={theme === "dark"}
                        />
                      </Form>
                      {user ? (
                        <div>
                            <h6>{user.result.name}</h6>
                            <Button variant="primary" onClick={handleLogout}>
                              <FormattedMessage id="logout.button" />
                            </Button>
                        </div>
                      ):(
                          <Button variant="primary">
                            <FormattedMessage id="login.button" />
                          </Button>
                      )}
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            </>
    );
}

export default Header;