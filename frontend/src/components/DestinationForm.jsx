import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { useDestinations } from "../hooks/useDestinations";

export const DestinationForm = ({ destinationSelected, handlerCloseForm }) => {

    const { initialDestinationForm, handlerAddDestination, errors } = useDestinations();
    
    const [destinationForm, setDestinationForm] = useState(initialDestinationForm);
    const { id, name, description, countryCode, type, lastModif } = destinationForm;

    useEffect(() => {
        setDestinationForm({
            ...destinationSelected
        });
    }, [destinationSelected]);

    const onInputChange = ({ target }) => {
        
        const { name, value } = target;
        setDestinationForm({
            ...destinationForm,
            [name]: value,
        })
    }    

    const onSubmit = async (event) => {

        event.preventDefault();
        handlerAddDestination(destinationForm);
        onCloseForm();
    }

    const onCloseForm = () => {

        handlerCloseForm();
        setDestinationForm(initialDestinationForm);
    }
    
    return (
        <form onSubmit={ onSubmit }>
            <input
                className="form-control my-3 w-75"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.name}</p>
            
            <input
                className="form-control my-3 w-75"
                placeholder="Description"
                type="description"
                name="description"
                value={description}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.description}</p>
            
            <input
                className="form-control my-3 w-75"
                placeholder="Country Code"
                name="countryCode"
                value={countryCode}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.countryCode}</p>

            <select
                className="form-control my-3 w-75"
                name="type"
                value={type}
                onChange={onInputChange}
            >
                <option value="">Select Type</option>
                <option value="BEACH">BEACH</option>
                <option value="MOUNTAIN">MOUNTAIN</option>
                <option value="CITY">CITY</option>
            </select>
            <p className="text-danger">{errors?.type}</p>
   

            <input type="hidden"
                name="id"
                value={id} />

            <input type="hidden"
                name="lastModif"
                value={lastModif} />
            
            <button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Edit' : 'Create'}
            </button>

            {!handlerCloseForm || <button
                className="btn btn-primary mx-2"
                type="button"
                onClick={() => onCloseForm()}>
                Close
            </button>}
            
        </form>
    )
}


DestinationForm.propTypes = {
    destinationSelected: PropTypes.object.isRequired,
    handlerCloseForm: PropTypes.func
}