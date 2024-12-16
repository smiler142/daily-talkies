import React from 'react';
import MegaNews from './MegaNews';
import NewsletterSubscription from './NewsletterSubscription';
import FooterCategories from './FooterCategories';
import SocialNetwork from './SocialNetwork';
import FooterLinks from './FooterLinks';
import FooterComments from './FooterComments';
import FooterInstagram from './FooterInstagram';

const Footer = () => {
    return (
        <>
            <footer className="footer_main">
                <div className="footer_left_wrap">
                    <div className="footer_inner_wrap">
                        <MegaNews />
                        <FooterCategories />
                        <NewsletterSubscription />
                        <SocialNetwork />
                    </div>
                    <FooterLinks />
                </div>
                <div className="footer_right_wrap">
                    <FooterComments />
                    <FooterInstagram />
                </div>
            </footer>
        </>
    )
}

export default Footer