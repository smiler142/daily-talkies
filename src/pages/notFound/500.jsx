import React from 'react';

const InternalServerError500 = () => {
    return (
        <div className='errorPageContainer'>
            <h2 style={{ color: '#FFD700', textShadow: "0px 0px 44px #FFD70059" }} className='errorPageHeading'>500</h2>
            <p className='errorPageMessage'>
                Something went wrong on our end. Please try refreshing the page or come back later.
            </p>
        </div>
    );
};

export default InternalServerError500;
