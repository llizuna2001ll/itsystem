import '../style/GetInTouch.css';

function GetInTouchBar() {

    window.onbeforeunload = () => {
        for(const form of document.getElementsByTagName('form')) {
            form.reset();
        }
    }

    return (
        <>
            <div className="get-in-touch-container">
                <h3>Contactez-nous</h3>
                <button id={"myInput"} type="button" className="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">
                    Cliquer ici
                </button>
            </div>

            <div style={{zIndex: 2000000}} className="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                 data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Contactez-nous</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form action="https://formspree.io/f/xgejbvyb" method="POST">
                            <div className="modal-body">
                                <div className="row g-3 mb-3">
                                    <div className="col">
                                        <label htmlFor="fullName" className="form-label ms-1">Nom Complet</label>
                                        <input type="text" name="name" id={"fullName"} className="form-control"
                                               placeholder="Nom Complet" aria-label="Nom Complet"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="email" className="form-label ms-1">Email</label>
                                        <input id={"email"} name="email" type="text" className="form-control"
                                               placeholder="Email" aria-label="Email"/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" name="message" id="message"
                                              rows="3"></textarea>
                                </div>
                                <input type="hidden" name="_next" value="/" />
                                <input
                                    type="hidden"
                                    name="_subject"
                                    value="Nouveau message depuis le formulaire de contact"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="submit"
                                        className="btn btn-primary bg-warning border-warning text-dark">Envoyer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetInTouchBar;