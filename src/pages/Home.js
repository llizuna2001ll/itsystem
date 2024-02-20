import React, {useEffect} from 'react';
import HomeCarousel from "../components/HomeCarousel";
import GetInTouchBar from "../components/GetInTouchBar";
import Partners from "../components/Partners";
import Realisation from "../components/Realisation";
import {FloatingWhatsApp} from "react-floating-whatsapp";
import RecentProducts from "../components/RecentProducts";

function Home() {
    const containerStyle = {
        overflow: "hidden",
        backgroundColor:"transparent"
    }

    useEffect(() => {
        document.title = 'IT-SYSTEM - Accueil';
    }, []);
    return (
        <>
            <HomeCarousel/>
            <GetInTouchBar/>
            <div style={containerStyle} className="ms-5 mt-3 me-5">
                <RecentProducts/>
                <Partners/>
            </div>

            <FloatingWhatsApp
                phoneNumber={'212672821362'}
                accountName={'IT SYSTEM'}
                avatar={'./images/logo_safety.jpg'}
                chatMessage={'Bonjour! Pouvons-nous vous aider ?'}
                statusMessage={"Généralement, des réponses dans l'heure"}
                placeholder={'Ecris un message...'}
            />
        </>
    );
}

export default Home;