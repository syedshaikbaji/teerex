import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (<>
        <footer className="mt-5">
            <div className="footer">
                <p>This is footer section.</p>
                <ul className="socials">
                    
                    <li><Link className='' to="/"><img className="img-fluid" src={require(`../assets/images/icons/ic-facebook.svg`).default} alt="logo" /></Link></li>
                    <li><Link className='' to="/"><img className="img-fluid" src={require(`../assets/images/icons/ic-twitter.svg`).default} alt="logo" /></Link></li>
                    <li><Link className='' to="/"><img className="img-fluid" src={require(`../assets/images/icons/ic-linkedin.svg`).default} alt="logo" /></Link></li>
                </ul>
                <div className="footer-copyright">
                    <p>copyright &copy;2023 </p>
                </div>
            </div>
        </footer>
    </>)
}

export default Footer;