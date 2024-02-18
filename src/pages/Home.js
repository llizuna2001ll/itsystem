import React, {useEffect} from 'react';
import HomeCarousel from "../components/HomeCarousel";
import GetInTouchBar from "../components/GetInTouchBar";
import Partners from "../components/Partners";
import Realisation from "../components/Realisation";

function Home() {
    const containerStyle = {
        overflow: "hidden",
    }

    useEffect(() => {
        document.title = 'IT-SYSTEM - Accueil';
    }, []);
    return (
        <>
            <HomeCarousel/>
            <GetInTouchBar/>
            <div style={containerStyle} className="ms-5 mt-3 me-5">
                <Realisation/>
                <Partners/>
            </div>
        </>
    );
}

export default Home;