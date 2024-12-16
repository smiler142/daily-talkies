import React from 'react';
import { NavLink } from 'react-router-dom';

const FooterLinks = () => {
    const footerLinks = [
        {
            name: "Privacy Policy",
            link: "/privacy-policy",
        },
        {
            name: "Terms & Conditions",
            link: "/terms-and-conditions",
        },
        {
            name: "Contact Us",
            link: "/contact-us",
        },
        {
            name: "About Us",
            link: "/about-us",
        },
    ];

    return (
        <div className="footer_links">
            <nav className="footer_links_list">
                {footerLinks.map((item, index) => (
                    <NavLink key={index} to={item.link} className="footer_link_item" >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
            <p className="copyRightsMsg">All copyright (c) 2022 reserved</p>
        </div>
    );
};

export default FooterLinks;
