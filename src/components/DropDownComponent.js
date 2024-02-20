import {NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import CategoryService from "../services/CategoryService";

function DropDownComponent() {
    const [categories, setCategories] = useState([]);

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


    let dropDownMapping = categories.map(category => (
        <NavDropdown.Item key={category.id}>
            <Link className="drop-item" to={`/products/${category.name.toLowerCase()}`}>
                {category.name}
            </Link>
        </NavDropdown.Item>
    ));


    return (
        <NavDropdown title="PRODUITS" id="basic-nav-dropdown" className={"fw-bold text-black"}>
            <NavDropdown.Item disabled className={"fw-bold text-black"}>Categories:</NavDropdown.Item>
            {dropDownMapping}
        </NavDropdown>
    );
}

export default DropDownComponent;
