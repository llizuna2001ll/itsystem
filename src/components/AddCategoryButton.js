import { useState } from "react";
import CategoryService from "../services/CategoryService";
import Loader from "./Loader";

function AddCategoryButton({ categories }) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const handleClose = () => {
        setShowModal(false);
        setSuccess("");
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true); // Set loading to true before the request
            const response = await CategoryService.createCategory({ name, description });
            console.log(response.data);
        } catch (error) {
            console.error("Error creating product:", error);
        } finally {
            setIsLoading(false);
            setSuccess("Catégorie ajoutée avec succès");
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-success position-absolute"
                style={{ right: "21%" }}
                onClick={handleShow}
            >
                Ajouter une Catégorie
            </button>

            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: "1000000000" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter une Catégorie</h5>
                                <button type="button" className="close" onClick={handleClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label>Nom:</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Description:</label>
                                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                </form>
                                {isLoading && (
                                    <div className="text-center">
                                        <Loader/>
                                    </div>
                                )}
                                {!isLoading && (
                                    <p className="text-center text-success">{success}</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Fermer
                                </button>
                                <button type="button" className="btn btn-success" onClick={handleSubmit} disabled={isLoading}>
                                    Ajouter Catégorie
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddCategoryButton;
