import React, {useEffect, useState} from "react";
import ProductService from "../services/ProductService";
import CategoryService from "../services/CategoryService";
import {DataGrid} from '@mui/x-data-grid';
import AddProductButton from "./AddProductButton";
import AddCategoryButton from "./AddCategoryButton";


function AdminContent({element}) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productsSize, setProductsSize] = useState();
    const [categorySize, setCategorySize] = useState();
    const [categoryColumns, setCategoryColumns] = useState([]);
    const [categoryRows, setCategoryRows] = useState([]);
    const [categoryLoader, setCategoryLoader] = useState(true);
    const [productColumns, setProductColumns] = useState([]);
    const [productRows, setProductRows] = useState([]);
    const [productLoader, setProductLoader] = useState(true);

    function formatTimestamp(timestampString) {
        const timestamp = new Date(timestampString);
        const formattedDate = timestamp.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        return formattedDate;
    }

    const refreshProductTable = async () => {

        setProductLoader(true);
        try {
            const response = await ProductService.getAllProducts();
            setProducts(response.data);
            setProductsSize(response.data.length);
            setProductColumns([
                {field: 'id', headerName: 'ID', width: 100},
                {field: 'name', headerName: 'Titre', width: 200},
                {field: 'brand', headerName: 'Marque', width: 200},
                {field: 'reference', headerName: 'Ref', width: 200},
                {field: 'category', headerName: 'Categorie', width: 200},
                {field: 'creationDate', headerName: 'Date d\'ajout', width: 200},

            ]);
            setProductRows(response.data.map(product => ({
                id: product.id,
                name: product.name,
                brand: product.brand,
                reference: product.reference,
                category: product.category.name,
                creationDate: formatTimestamp(product.creationDate)

            })));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setProductLoader(false);
    };

    useEffect(() => {
        refreshProductTable();
    }, [element]);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategoryLoader(true);
            try {
                const response = await CategoryService.getAllCategories();
                setCategories(response.data);
                setCategorySize(response.data.length);
                setCategoryColumns([
                    {field: 'id', headerName: 'ID', width: 100},
                    {field: 'name', headerName: 'Titre', width: 300},
                ]);
                setCategoryRows(response.data.map(category => ({
                    id: category.id,
                    name: category.name,
                })));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories().then(() => setCategoryLoader(false));
    }, [element]);

    if (element === "home") {
        return (
            <div className={"d-flex justify-content-around align-items-center w-100 text-center"}>
                <div className="rectangle bg-warning rounded-2" style={{padding: "20px 15px", minWidth: "250px"}}>
                    <h4>Catégories</h4>
                    <p>{categorySize} catégories</p>
                </div>
                <div className="rectangle bg-warning rounded-2" style={{padding: "20px 15px", minWidth: "250px"}}>
                    <h4>Produits</h4>
                    <p>{productsSize} produits</p>
                </div>
            </div>
        );
    } else if (element === "categories") {
        return (
            <>
                <AddCategoryButton/>
                <div className="w-50 mt-5 d-flex justify-content-center">
                    {categoryLoader ? (
                        <p>Loading categories...</p>
                    ) : (
                        <DataGrid
                            rows={categoryRows}
                            columns={categoryColumns}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 5},
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    )}
                </div>
            </>
        );
    } else if (element === "products") {
        return (
            <>
                <AddProductButton categories={categories}/>
                <button onClick={()=> refreshProductTable()} style={{left:"27%"}} className={"btn btn-secondary position-absolute"}>Actualiser tableau</button>
                <div className="w-75 h-100 mt-5 d-flex justify-content-center">
                    {productLoader ? (
                        <p>Loading products...</p>
                    ) : (
                        <DataGrid
                            rows={productRows}
                            columns={productColumns}
                        />
                    )}
                </div>
            </>
        );
    }
}

export default AdminContent;
