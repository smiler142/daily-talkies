import React from 'react';

const Forbidden403 = () => {
    return (
        <div className='errorPageContainer'>
            <h2 className='errorPageHeading'>403</h2>
            <p className='errorPageMessage'>
                You don’t have permission to access this page. Please contact the administrator if you think this is a mistake.
            </p>
        </div>
    );
};

export default Forbidden403;
