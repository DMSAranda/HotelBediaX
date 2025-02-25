import { useDestinations } from "../hooks/useDestinations"
import PropTypes from 'prop-types';

export const DestinationRow = ({id, name, description, countryCode, type, lastModif}) => {

    const {handlerRemoveDestination, handlerDestinationSelected} = useDestinations()

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{description}</td>
            <td>{countryCode}</td>
            <td>{type}</td>
            <td>{lastModif}</td>
            <td>
                <button type="button"
                    className="btn btn-primary btn-sm"
                    onClick = { () => handlerDestinationSelected({id, 
                                                                  name, 
                                                                  description, 
                                                                  countryCode, 
                                                                  type, 
                                                                  lastModif}) 
                              }>
                    <i className="bi bi-pencil" style={{ fontSize: '16px' }}></i>
                </button>
            </td>    
            <td>
                    <button type="button"
                        className="btn btn-danger btn-sm"
                        onClick = { () => handlerRemoveDestination(id) }>
                        <i className="bi bi-trash" style={{ fontSize: '16px' }}></i> 
                    </button>
            </td>    
        </tr>
    )
}

DestinationRow.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    lastModif: PropTypes.string.isRequired,
}