import React from 'react'
import iceCreamImg from '../assets/img/ultimate-ice-cream.svg';
import FocusLink from './FocusLink';

export default function Header() {
    return(
        <header>
            <h1>
                <img src={iceCreamImg} alt="no img found"></img>
                    Here goes the Header
            </h1>
            <nav>
                <FocusLink to = "/" activeClassName = 'active' exact> Menu </FocusLink>
                <FocusLink to = "/ice-creams" activeClassName = 'active'> Add Ice-Cream</FocusLink>
            </nav>
        </header>
    )
}
