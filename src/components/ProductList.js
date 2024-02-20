import React, {useEffect, useState} from "react";
import ProductService from "../services/ProductService";
import Loader from "./Loader"; // Import your Loader component
import "../style/Pagination.css";
import "../style/Product.css";
import {useNavigate} from "react-router-dom";

function ProductList({categoryId}) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getProductsByCategoryId(
                    categoryId,
                    page
                );
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, page]);

    useEffect(() => {
        setPage(0);
    }, [categoryId]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    function isNewProduct(createdAt) {
        // Calculate the difference in milliseconds between now and the createdAt date
        const differenceMs = new Date() - new Date(createdAt);

        // Convert milliseconds to days
        const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

        console.log(differenceDays)
        return differenceDays <= 3;
    }

    let productsMapping = products.map((product) => (
        <div onClick={() => navigate(`/products/${product.category.name.toLowerCase()}/${product.name}`)}
             className="card productContainer position-relative" style={{maxWidth: "18rem"}} key={product.id}>
            {isNewProduct(product.creationDate) &&
                <span className="badge bg-success position-absolute top-0 end-0">Nouveau</span>
            }
            <img
                src={`https://itsystembucket.s3.amazonaws.com/${product.imagePath}`}
                className="card-img-top"
                style={{height:"200px",objectFit:"cover"}}
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
            {loading ? (
                <div className="loader-container">
                    <Loader/>
                </div>
            ) : products.length === 0 ? (
                <h2 className={"text-center mt-5"}>Pas de produits pour le moment</h2>
            ) : (
                <>
                    <div className="d-flex gap-4 justify-content-center mx-auto w-75 mt-4 flex-wrap">
                        {productsMapping}
                    </div>

                    <nav
                        aria-label="Page navigation example"
                        className={"mt-5 d-flex justify-content-center"}
                    >
                        <ul className="pagination justify-content-end">
                            <li className={`page-item  ${page === 0 && "disabled"}`}>
                                <button
                                    className="page-link previousButton"
                                    onClick={() => handlePageChange(page - 1)}
                                    tabIndex="-1"
                                    aria-disabled={page === 0}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map((num) => (
                                <li
                                    key={num}
                                    className={`page-item ${page === num && "activePage"}`}
                                >
                                    <button
                                        className="page-link text-black"
                                        onClick={() => handlePageChange(num)}
                                    >
                                        {num + 1}
                                    </button>
                                </li>
                            ))}
                            <li
                                className={`page-item activePage ${
                                    page === totalPages - 1 && "disabled"
                                }`}
                            >
                                <button
                                    className="page-link fw-light"
                                    onClick={() => handlePageChange(page + 1)}
                                    aria-disabled={page === totalPages - 1}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </>
    );
}

export default ProductList;
