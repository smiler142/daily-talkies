import React, { useState } from 'react';

const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setError('Email is required.');
        } else if (!emailRegex.test(email)) {
            setError('Invalid email format.');
        } else {
            setError('');
            alert('Subscribed successfully!');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') validateEmail();
    };

    return (
        <div className="nl_subscription">
            <h3 className="main_heading">Newsletters</h3>
            <label className="nl_subscription_wrap" htmlFor="nl_subscription_input">
                <input
                    type="email"
                    className={`nl_subscription_input ${error ? 'input_error' : ''}`}
                    placeholder="Write your email..."
                    name="NewsletterSubscription"
                    id="nl_subscription_input"
                    value={email}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <div className="nl_subscription_wrap_icon" onClick={validateEmail} role="button" tabIndex={0}>
                    <svg width="100%" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.125 0.5C19.1406 0.5 20 1.35938 20 2.375C20 3 19.6875 3.54688 19.2188 3.89844L10.7422 10.2656C10.2734 10.6172 9.6875 10.6172 9.21875 10.2656L0.742188 3.89844C0.273438 3.54688 0 3 0 2.375C0 1.35938 0.820312 0.5 1.875 0.5H18.125ZM8.47656 11.2812C9.375 11.9453 10.5859 11.9453 11.4844 11.2812L20 4.875V13C20 14.4062 18.8672 15.5 17.5 15.5H2.5C1.09375 15.5 0 14.4062 0 13V4.875L8.47656 11.2812Z" fill="#3E3232" />
                    </svg>
                </div>
            </label>
            {error && <p className="error_message">{error}</p>}
        </div>
    );
};

export default NewsletterSubscription;
