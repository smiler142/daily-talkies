import React from 'react';
import { NavLink } from 'react-router-dom';
import facebookIcon from '../../../assets/images/social_icons/facebook.png';
import instagramIcon from '../../../assets/images/social_icons/instagram.png';
import linkedinIcon from '../../../assets/images/social_icons/linkedin.png';
import mediumIcon from '../../../assets/images/social_icons/medium.png';
import pinterestIcon from '../../../assets/images/social_icons/pinterest.png';
import twitterIcon from '../../../assets/images/social_icons/twitter.png';

const SocialNetwork = () => {
    const socialNetwork = [
        {
            name: "Instagram",
            image: instagramIcon,
            link: "https://www.instagram.com",
        },
        {
            name: "Facebook",
            image: facebookIcon,
            link: "https://www.facebook.com",
        },
        {
            name: "Twitter",
            image: twitterIcon,
            link: "https://www.twitter.com",
        },
        // {
        //     name: "LinkedIn",
        //     image: linkedinIcon,
        //     link: "https://www.linkedin.com",
        // },
        // {
        //     name: "Medium",
        //     image: mediumIcon,
        //     link: "https://www.medium.com",
        // },
        // {
        //     name: "Pinterest",
        //     image: pinterestIcon,
        //     link: "https://www.pinterest.com",
        // },
    ];

    return (
        <div className="footer_social_network">
            <h3 className="main_heading">Follow Us</h3>
            <div className="footer_social_network_list">
                {socialNetwork.map((social, index) => (
                    <NavLink key={index} to={social.link} target="_blank" className="footer_social_network_link">
                        <img src={social.image} alt={`${social.name} icon`} className="footer_social_network_icon" />
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default SocialNetwork;
