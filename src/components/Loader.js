import React, { useState, useEffect } from 'react';

function Loader() {
    const [loaderImage, setLoaderImage] = useState(null);
    const [loadingText, setLoadingText] = useState('Chargement en cours...         ');
    const loadingTextArray = loadingText.split('');

    useEffect(() => {
        // Get a list of loader images from the "loaders" directory
        const loaderImages = [
            'drill_loader.png',
            'jigsaw_loader.png',
        ];

        // Select a random loader image
        const randomIndex = Math.floor(Math.random() * loaderImages.length);
        const randomLoaderImage = loaderImages[randomIndex];

        // Set the selected loader image
        setLoaderImage(randomLoaderImage);

        // Rotate the loader image continuously
        const rotateImage = setInterval(() => {
            // Select the loader image element
            const imageElement = document.getElementById('loaderImage');
            if (imageElement) {
                // Rotate the image by a certain angle
                imageElement.style.transform = `rotate(${(parseInt(imageElement.style.transform.replace('rotate(', '').replace('deg)', '') || '0', 10) + 10) % 360}deg)`;
            }
        }, 60);

        // Update loading text on a loop
        const updateLoadingText = setInterval(() => {
            setLoadingText(prevText => {
                // Rotate the loading text
                const rotatedText = prevText.slice(1) + prevText.charAt(0);
                return rotatedText;
            });
        }, 70);

        // Clean up intervals when the component unmounts
        return () => {
            clearInterval(rotateImage);
            clearInterval(updateLoadingText);
        };
    }, []);

    return (
        <>
            <div className="loader-container d-flex justify-content-center mt-5">
                {loaderImage && (
                    <img
                        src={`../images/loaders/${loaderImage}`}
                        alt="Loader"
                        className="loader"
                        id="loaderImage"
                    />
                )}
            </div>
            <p style={{ color: "#4B4B4B" }} className={"fw-bold opacity-50 text-center mt-3"}>
                {loadingTextArray.map((char, index) => (
                    <span key={index}>{char}</span>
                ))}
            </p>
        </>
    );
}

export default Loader;
