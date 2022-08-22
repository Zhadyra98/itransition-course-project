import React from "react";
import Container from 'react-bootstrap/Container';
import HeaderSearch from "./HeaderSearch";
import HeaderLocale from "./HeaderLocale";
import HeaderModeToggler from "./HeaderModeToggler";
import HeaderButton from "./HeaderButton";

const Header = ({ locale, setLocale, toggleTheme, theme }) => {
  return(
    <header className="bg-primary mb-5">
      <Container>
        <div className="d-flex">
          <HeaderSearch />
          <HeaderButton />
          <HeaderLocale locale={locale} setLocale={setLocale} />
          <HeaderModeToggler toggleTheme={toggleTheme} theme={theme} />
        </div>
      </Container>
    </header>
  );
}

export default Header;