import React, {useEffect} from "react";
import AboutUs from "../components/AboutUs";
import EngineeringIcon from '@mui/icons-material/Engineering';
function Societe() {
    useEffect(() => {
        document.title = 'IT-SYSTEM - Société';
    }, []);
    return (
        <div className={"d-flex flex-column w-100 text-center mt-5"}>
            <h2 className={"mt-5"}>Coming Soon . . .</h2>
            <EngineeringIcon className={"mx-auto"} style={{fontSize:"200px"}}/>
        </div>
    );
}

export default Societe;