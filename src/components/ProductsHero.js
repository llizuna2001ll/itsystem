import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import '../style/Hero.css';

function ProductsHero({ category }) {
    if (!category) {
        return (
            <>
                <div className="mt-4 p-5 text-black rounded-4 ms-5 me-5 text-center d-flex flex-column align-items-center hero">
                    <nav aria-label="breadcrumb" className="text-center fw-bolder">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item text-black"><Skeleton className={"ms-2"} width={50} /></li>
                            <li className="breadcrumb-item"><Skeleton className={"ms-2"} width={50} /></li>
                            <li className="breadcrumb-item text-secondary active" aria-current="page"><Skeleton className={"ms-2"} width={50} /></li>
                        </ol>
                    </nav>
                    <h1><Skeleton animation="wave" width={300} /></h1>
                    <p><Skeleton animation="wave" width={50} /></p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="mt-4 p-5 text-black rounded-4 ms-5 me-5 text-center d-flex flex-column align-items-center hero">
                <nav aria-label="breadcrumb" className="text-center fw-bolder">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item text-black"><Link className={"text-decoration-none text-black"} to={"/"}>Accueil</Link></li>
                        <li className="breadcrumb-item "><Link className={"text-decoration-none text-black"} to={"/produits"}>Produits</Link></li>
                        <li className="breadcrumb-item text-secondary active" aria-current="page">{category.name}</li>
                    </ol>
                </nav>
                <h1>{category.name}</h1>
                <p>{category.description}</p>
            </div>
        </>
    );
}

export default ProductsHero;
