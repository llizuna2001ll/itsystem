import ProductsHero from "../components/ProductsHero";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CategoryService from "../services/CategoryService";
import ProductList from "../components/ProductList";

function AllProductsPage() {
    const {categoryName} = useParams();
    const [category, setCategory] = useState({});

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await CategoryService.getCategoryByName(categoryName);
                setCategory(response.data);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();

    }, [categoryName]);
    return(
      <>
          <ProductsHero category={category}/>
          <ProductList categoryId={category.id}/>
      </>
    );
}

export default AllProductsPage;