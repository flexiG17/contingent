import React from 'react';
import {Navbar} from '../../common';
import './Header.css';
import Logo from '../Header/full_logo.png';
import {HOME_ROUTE} from "../../../utils/consts/pathRoutes";
import {Link} from "react-router-dom";


export default function Header() {

    return (
        <section className="header">
            <section className="header-top">
                <section className="header-top__logo">
                    <Link to={HOME_ROUTE} className="header-logo"><img src={Logo} width="150px" height="108,7px" alt=""/></Link>
                </section>
                <section className="header-top__navigation">
                    <Navbar/>
                </section>
            </section>
        </section>
    )
}