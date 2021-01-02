import React,{ useEffect, useRef } from 'react'
import Helmet from 'react-helmet';
import {withRouter} from 'react-router-dom';

function Main({children, headingText, headingLevel = 2, location}) {
    
    const headRef = useRef(null);

    const H = `h${headingLevel}`;

    useEffect(() => {

        if(location.state && location.state.focus){
            headRef.current.focus();
        }

        window.scrollTo(0,0);
        
    }, [location.state])

    return (
        <main tabIndex="-1" id="main">
            <Helmet>
                <title>{headingText} | Ultimate Ice cream</title>
            </Helmet>
            <H ref = {headRef} tabIndex="-1" className='main-heading'>{headingText}</H>
            {children}
        </main>
    )
};

export default withRouter(Main);