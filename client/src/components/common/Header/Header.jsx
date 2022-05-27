import React from 'react';
import { Navbar } from '../../common';
import './Header.css';
import Logo from '../Header/logo.png';


function Header() {

    return (
        <section className="header">
            <section className="header-top">
                <section className="header-top__logo">
                    <a href="/HomePage" className="header-logo"><img src={Logo} width = "220px" height= "55px" alt=""/></a>
                </section>
                    <section className="header-top__navigation">
                            <Navbar />
                    </section>
                </section>
        </section>
            )
}

export default Header;