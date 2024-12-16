import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import config from "../../../../config";
import { useParams } from "react-router-dom";

const unsplashApi = createApi({
    accessKey: config.unsplashAPI.key,
});

const FooterInstagram = () => {
    const [photoData, setPhotoData] = useState([]);
    const { key } = useParams();

    useEffect(() => {
        const fetchPhotos = async (query) => {
            try {
                const result = await unsplashApi.photos.getRandom({
                    count: 9,
                    query,
                    orientation: "landscape",
                });
                if (result.errors) throw new Error(result.errors[0]);
                setPhotoData(result.response);
            } catch {
                if (query !== "instagram") fetchPhotos("instagram");
            }
        };

        fetchPhotos(key || "instagram");
    }, [key]);

    if (!photoData.length) {
        return <></>;
    }

    return (
        <div className="footer_insta_container">
            <h3 className="main_heading">Follow on Instagram</h3>
            <div className="footer_insta_grid">
                {photoData.map((photo) => (
                    <a key={photo.id} href={photo.links.html} target="_blank" rel="noopener noreferrer" className="footer_insta_img_item" >
                        <img src={photo.urls.small} alt={photo.alt_description || "Random Unsplash Photo"} className="footer_insta_img" />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default FooterInstagram;