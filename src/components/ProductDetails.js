import { Skeleton } from '@mui/material';
import NumbersIcon from '@mui/icons-material/Numbers';

function ProductDetails({ product }) {
    if (!product.category) {
        return (
            <div style={{ width: "600px" }} className={"d-flex ms-4 me-4 mt-2 flex-column w-40"}>
                <Skeleton variant="rectangular" width={600} height={100} animation="wave" />
                <Skeleton variant="rectangular" width={600} height={50} animation="wave" />
                <Skeleton variant="rectangular" width={600} height={50} animation="wave" />
                <Skeleton variant="rectangular" width={600} height={150} animation="wave" />
            </div>
        );
    }

    return (
        <div style={{ width: "600px" }} className={"d-flex ms-4 me-4 mt-2 flex-column w-40"}>
            <h3 className={"fw-bold ms-2"}>{product.name}</h3>
            <div className={"d-flex flex-row justify-content-between ms-2 me-5 mt-4 w-100"}>
                <div className="d-flex  justify-content-between">
                    <img className={"me-2"} width={50} height={50} src={"../../images/icons/brand.png"} alt={"brand-icon"} />
                    <div className="d-flex flex-column">
                        <h7>Marque</h7>
                        <h5>{product.brand}</h5>
                    </div>
                </div>

                <div className="d-flex">
                    <NumbersIcon className={"mt-2 me-2"} fontSize={"large"} />
                    <div className="d-flex flex-column">
                        <h7>Ref</h7>
                        <h5>{product.reference}</h5>
                    </div>
                </div>
            </div>
            <div className={"d-flex flex-row justify-content-between ms-2 me-5 mt-4 w-75"}>
                <div className="d-flex  justify-content-between">
                    <img className={"me-2"} width={50} height={50} src={"../../images/icons/category.png"} alt={"category-icon"} />
                    <div className="d-flex flex-column">
                        <h7>Catégorie</h7>
                        <h5>{product.category.name}</h5>
                    </div>
                </div>
            </div>

            <div className={"d-flex flex-row justify-content-between ms-2 me-5 mt-4 w-75"}>
                <div className="d-flex  justify-content-between">
                    <div className="d-flex flex-column">
                        <h5>Descriprion</h5>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
