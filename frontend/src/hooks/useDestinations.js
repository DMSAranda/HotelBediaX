import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { /*findAll,*/ findAllPages, remove, save, update } from "../services/destinationService";
import { useDispatch, useSelector } from "react-redux";
import { addDestination, loadingDestinations, onCloseForm, onOpenForm, onDestinationSelected, removeDestination, updateDestination, initialDestinationForm, onError } from "../store/slices/destinationsSlice";
import { useCallback } from "react";


export const useDestinations = () => {

    const { destinations, destinationSelected, visibleForm, errors, isLoading, paginator } = useSelector(state=> state.destinations);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getDestinations = useCallback(async (page = 0) => {

        try {            
            //const result = await findAll();
            const result = await findAllPages(page);
            
            dispatch(
                        loadingDestinations(result.data)
                    );
        } catch (error) {
            if (error.response?.status == 401) {
               // handlerLogout();
               throw error;
            }
        }
    }, [dispatch]);

    const handlerAddDestination = async (destination) => {

        let response;
        try {

            if (destination.id === 0) {
                response = await save(destination);
                dispatch(
                    addDestination(response.data)
                )
            } else {
                response = await update(destination);
                dispatch(
                    updateDestination(response.data)
                )
            }

            Swal.fire(
                (destination.id === 0) ?
                    'Destination Created' :
                    'Destination Updated',
                (destination.id === 0) ?
                    'Destination created successfully!' :
                    'Destination updated successfully!',
                'success'
            );
            handlerCloseForm();
            if (window.location.pathname !== '/destinations') {
                navigate('/destinations');
            }
        } catch (error) {
            if (error.response && error.response.status == 400) {
                dispatch(
                    onError(error.response.data)
                );
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {
            
                if (error.response.data?.message?.includes('UK_name')) {
                    dispatch(
                        onError({ name: 'Destination already exist!' })
                    );
                }
               
            } else if (error.response?.status == 401) {
                // handlerLogout();
                throw error;
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveDestination = (id) => {

        Swal.fire({
            title: 'Are you sure, Do you want to delete?',
            text: "Caution, destination will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id);
                    dispatch(
                             removeDestination(id)
                            )
                        
                    Swal.fire(
                        'Destination deleted!',
                        'Destination deleted successfully!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 401) {
                        //handlerLogout();
                        throw error;
                    }
                }
            }
        })

    }

    const handlerDestinationSelected = (destination) => {
        dispatch(onDestinationSelected({...destination}))
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm())
        dispatch(onError({}));
    }

    return {
        destinations,
        destinationSelected,
        initialDestinationForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddDestination,
        handlerRemoveDestination,
        handlerDestinationSelected,
        handlerOpenForm,
        handlerCloseForm,
        getDestinations,
    }
}