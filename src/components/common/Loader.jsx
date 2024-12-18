import React from 'react';
import ClipLoader from "react-spinners/HashLoader";

const Loader = () => {
    const css = {
        loaderWrap: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "40px",
        },
        loaderHeading: {
            color: "#FC4308",
            fontSize: "50px",
            lineHeight: "1",
            fontWeight: "600",
            position: "relative"
        },
    };

    return (
        <>
            <div className="loader_wrap" style={css.loaderWrap}>
                <h2 className="loader_heading" style={css.loaderHeading}>Daily Talkies</h2>
                <ClipLoader color={"#FC4308"} size={80} aria-label="Loading Spinner" data-testid="loader" />
            </div>
        </>
    );
};

export default Loader;
