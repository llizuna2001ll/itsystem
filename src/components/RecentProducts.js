import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Skeleton} from '@mui/material';
import ProductService from "../services/ProductService";

function RecentProducts() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getRecentProducts();
                setProducts(response.data);
                console.log(products)
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading || products === null) {
        return (
            <div className="d-flex gap-4 justify-content-center mx-auto w-75 mt-4 flex-wrap">
                <Skeleton variant="rect" width={210} height={118}/>
                <Skeleton variant="rect" width={210} height={118}/>
                <Skeleton variant="rect" width={210} height={118}/>
            </div>
        );
    }

    let productsMapping = products.map((product) => (
        <div onClick={() => navigate(`/products/${product.category.name.toLowerCase()}/${product.name}`)}
             className="card productContainer position-relative" style={{width: "18rem"}} key={product.id}>
            <span className="badge bg-success position-absolute top-0 end-0">Nouveau</span>
            <img
                src={`https://itsystembucket.s3.amazonaws.com/${product.imagePath}`}
                className="card-img-top"
                alt="produit"
            />
            <div className="card-body">
                <h4 className={"text-center fw-bolder"}>{product.name}</h4>
                <p className="card-text"><strong>Marque:</strong> {product.brand}</p>
                <p className="card-text"><strong>Référence:</strong> {product.category.name}</p>
            </div>
        </div>

    ));

    return (
        <>
            <h5 className="partners-header mt-3 fw-bold">Nouveaux produits</h5>
            {products.length === 0 ? (
            <h2 className={"text-center mt-5"}>Pas de produits pour le moment</h2>
            ) : (<div className="d-flex gap-5 justify-content-center mx-auto w-75 mt-4 flex-nowrap mt-5">
                {productsMapping}
            </div>)}
        </>
    );
}

export default RecentProducts;
