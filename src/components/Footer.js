import '../style/Footer.css';
import {useEffect, useState} from "react";
import CategoryService from "../services/CategoryService";
import {Link} from "react-router-dom";
import ProductService from "../services/ProductService";

function Footer() {
    const [categories, setCategories] = useState([]);
    const [recentProducts, setRecentProducts] = useState([]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryService.getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();

    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getRecentProducts();
                setRecentProducts(response.data);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    let categoriesMapping = categories.map(category =>(
        <li key={category.id}><Link to={`/products/${category.name.toLowerCase()}`}>{category.name}</Link></li>
    ));

    let productMapping = recentProducts.map(product =>(
        <li key={product.id}><Link to={`/products/${product.category.name.toLowerCase()}/${product.name}`}>{product.name}</Link></li>
    ));

    return (
        <div className="footer-dark">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Categories</h3>
                            <ul>
                                {categoriesMapping}
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Produits Recents</h3>
                            <ul>
                                {productMapping}
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>IT-SYSTEM</h3>
                            <p>Bienvenue chez IT System, votre destination incontournable pour tout ce qui concerne
                                l'outillage ! Notre magasin propose un vaste assortiment
                                d'outils de qualité supérieure, allant des outils à main traditionnels aux équipements
                                électriques de pointe et aux accessoires spécialisés. Notre équipe compétente et
                                passionnée est là pour vous offrir des conseils avisés et une assistance technique
                                personnalisée, garantissant ainsi votre satisfaction et votre tranquillité d'esprit.</p>
                        </div>
                        <div className="col item social"><a href="#"><i className="lni lni-facebook-oval"></i></a><a
                            href="#"><i className="lni lni-twitter-original"></i></a><a href="#"><i
                            className="lni lni-instagram-original"></i></a></div>
                    </div>
                    <p className="copyright">IT-SYSTEM © 2020</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;