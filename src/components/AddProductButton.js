import {useState} from "react";
import ProductService from "../services/ProductService";
import Loader from "./Loader";

function AddProductButton({categories}) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const [success, setSuccess] = useState("");
    const [failure, setFailure] = useState("");

    const handleClose = () => {
        setShowModal(false);
        setSuccess("");
        setFailure("");
        setName("");
        setBrand("");
        setReference("");
        setDescription("");
        setCategoryName("");
        setProductImage(null);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const handleSubmit = async () => {
        setSuccess("");
        setFailure("");
        try {
            if (!name || !brand || !reference || !description || !categoryName || !productImage) {
                // Check if any field is empty
                setFailure("Merci de remplir tous les champs!");
                return;
            }

            setIsLoading(true); // Set loading to true before the request
            const response = await ProductService.createProduct(name, brand, reference, description, categoryName, productImage);
            console.log(response.data); // Log or handle response

            setSuccess("Produit ajouté avec succès");

            setName("");
            setBrand("");
            setReference("");
            setDescription("");
            setCategoryName("");
            setProductImage(null);
        } catch (error) {
            setFailure("Erreur inattendue merci de contacter votre support");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <button
                type="button"
                className="btn btn-success position-absolute"
                style={{right: "11%"}}
                onClick={handleShow}
            >
                Ajouter un produit
            </button>

            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog"
                     style={{display: 'block', zIndex: "1000000000"}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter un produit</h5>
                                <button type="button" className="close" onClick={handleClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label>Nom:</label>
                                        <input type="text" className="form-control" value={name}
                                               onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Marque</label>
                                        <input type="text" className="form-control" value={brand}
                                               onChange={(e) => setBrand(e.target.value)}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Réference:</label>
                                        <input type="text" className="form-control" value={reference}
                                               onChange={(e) => setReference(e.target.value)}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Description:</label>
                                        <textarea className="form-control" value={description}
                                                  onChange={(e) => setDescription(e.target.value)}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Catégorie:</label>
                                        <select className="form-control" value={categoryName}
                                                onChange={(e) => setCategoryName(e.target.value)}>
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Image du Produit:</label>
                                        <input type="file" className="form-control"
                                               onChange={(e) => setProductImage(e.target.files[0])}/>
                                    </div>
                                </form>
                                {isLoading && (
                                    <div className="text-center">
                                        <Loader/>
                                    </div>
                                )}
                                {!isLoading && (
                                    <>
                                        <p className="text-center text-success">{success}</p>
                                        <p className="text-center text-danger">{failure}</p>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Fermer
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}
                                        disabled={isLoading}>
                                    Ajouter Produit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddProductButton;
