import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProductService from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";

function ProductPage() {
    const {productName} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductService.getProductByName(productName);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();

    }, [productName]);
    return(
        <>
            <div className={"d-flex flex-wrap w-100 mt-4"}>
                <img className={"ms-4 w-50"} src={`https://itsystembucket.s3.amazonaws.com/${product.imagePath}`}/>
                <ProductDetails product={product}/>
            </div>
        </>
    );
}

export default ProductPage;