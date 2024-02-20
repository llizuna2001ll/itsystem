import AdminContent from "./AdminContent";
import {useState} from "react";

function AdminNavigation() {
    const [element, setElement] = useState("home");


    return (
        <>
            <div className={"d-flex flex-row"}>
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark rounded-2 mt-5 ms-4 "
                     style={{width: "280px", height: "100%"}}>
                    <p
                        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none">
                        <span className="fs-4">Informations</span>
                    </p>
                    <hr/>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li style={{cursor: "pointer"}} onClick={() => setElement("home")}>
                            <p className="nav-link link-light" aria-current="page">
                                Home
                            </p>
                        </li>

                        <li style={{cursor: "pointer"}} onClick={() => setElement("products")}>
                            <p className="nav-link link-light">
                                Produits
                            </p>
                        </li>

                        <li style={{cursor: "pointer"}} onClick={() => setElement("categories")}>
                            <p className="nav-link link-light">
                                Catégories
                            </p>
                        </li>
                    </ul>
                    <hr className={"link-light"}/>
                </div>
                <div className={"w-100 d-flex justify-content-center mt-2"}>
                    <AdminContent element={element}/>
                </div>
            </div>
        </>
    );
}

export default AdminNavigation;
