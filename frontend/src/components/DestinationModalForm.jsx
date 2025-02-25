import { DestinationForm } from "./DestinationForm"
import { useDestinations } from "../hooks/useDestinations";

export const DestinationModalForm = () => {

    const { destinationSelected, handlerCloseForm }  = useDestinations();

    return (
        <>
            <div className="abrir-modal animacion fadeIn">
                <div className="modal" style={{ display: "block" }} tabIndex={-1}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {destinationSelected.id > 0 ? 'Edit' : 'Create'}
                                </h5>
                            </div>
                            <div className="modal-body">
                                <DestinationForm
                                    destinationSelected={destinationSelected}
                                    handlerCloseForm={() => handlerCloseForm()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}