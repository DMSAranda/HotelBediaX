import { DestinationRow } from "./DestinationRow"
import PropTypes from "prop-types"
//import { useDestinations } from "../hooks/useDestinations";

export const DestinationsList = ({destinations}) => {

    //const { destinations } = useDestinations();

    return (
        <>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>COUNTRY CODE</th>  
                        <th>TYPE</th>
                        <th>LAST MODIFICATION</th>                                    
                        <th>UPDATE</th>
                        <th>REMOVE</th>           
                    </tr>
                </thead>
                <tbody>
                       {
                        destinations.map(({id, name, description, countryCode, type, lastModif}) => (
                                            <DestinationRow key={id}
                                                            id={id}
                                                            name={name}
                                                            description={description}
                                                            countryCode={countryCode} 
                                                            type={type} 
                                                            lastModif={lastModif}                              
                                            />      
                                          )
                                 )
                       }
                </tbody>
            </table>
        </>       
    )
}

DestinationsList.propTypes = {
    destinations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        lastModif: PropTypes.string.isRequired
    })).isRequired
};
   