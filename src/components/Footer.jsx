import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import "../css/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebookF, faTwitter, faLinkedin)

function Footer() {
    return (<div>
        <footer className="footer">
            <div className="footer-bottom-area">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="footer-bottom-part">
                                <div className="copyright"><a href="https://anditthemes.com/">Pollitos</a> &copy; 2021. All
                                    Rights Reserved</div>
                                <div className="footer-social">
                                    <ul>
                                        <li><a href="/"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                        <li><a href="/"><FontAwesomeIcon icon={faTwitter} /></a></li>
                                        <li><a href="/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div className="top-arrow">
            <a href="/" id="scroll" style={{ display: "none" }}><i className="fas fa-angle-up"></i></a>
        </div>
    </div>);
}
export default Footer;