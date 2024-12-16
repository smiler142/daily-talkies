import React, { useState, useEffect } from 'react';

const MegaNews = () => {
    const [newsData, setNewsData] = useState(null);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     var url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=1cff982ca89c4aabb5175712ffba993a';
    //     var req = new Request(url);

    //     fetch(req)
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //             setNewsData(data);
    //         })
    //         .catch(function (error) {
    //             setError('Error fetching news: ' + error.message);
    //         });
    // }, []);

    return (
        <>
            <div className="footer_mega_news">
                <h3 className="main_heading">Mega news</h3>
                {error ? (
                    <p className="error_message">{error}</p>
                ) : newsData ? (
                    <p className="mega_news_cont">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in
                        nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.
                        In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique
                        senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin
                        {/* {newsData.articles[2]?.content || "No content available for this article."} */}
                    </p>
                ) : (
                    <p className="mega_news_cont">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in
                        nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.
                        In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique
                        senectus et netus. Mattis pellentesque id nibh tortor id aliquet lectus proin
                    </p>
                )}
            </div>
        </>
    );
};

export default MegaNews;
