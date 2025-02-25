import { DestinationModalForm } from "../components/DestinationModalForm";
import { DestinationsList } from "../components/DestinationsList"
import { useDestinations } from "../hooks/useDestinations";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const DestinationsPage = () => {

    const page = useParams().page;

    const [search, setSearch] = useState('');

    console.log(search)

       
    const { destinations,
            visibleForm,
            isLoading,
            paginator,
            handlerOpenForm, 
            getDestinations  
          } = useDestinations();

    const onInputChange = ({ target }) => {   
        setSearch(target.value);
    }      
    
    let filteredDestinations = [];
    
        if (!search) {
            filteredDestinations = destinations;
        }else{
            filteredDestinations =  destinations.filter( 
                (data) => data.name.toLowerCase().includes(search.toLowerCase()) ||
                          data.description.toLowerCase().includes(search.toLowerCase() ) || 
                          data.countryCode.toLowerCase().includes(search.toLowerCase() ) || 
                          data.type.toLowerCase().includes(search.toLowerCase() ) 
            );
        }
        

    useEffect(()=>{
        getDestinations(page);
    }, [page, getDestinations]);    
    

    if(isLoading){
        return(
            <div className="container my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <>
            {!visibleForm ||
                <DestinationModalForm />
            }
            <div className="container my-4">
                <h3 className="mb-3">DESTINATIONS</h3>
                <div className="row">

                    <div className="col">
                        { //visibleForm ||                          
                             <>
                                <div className="d-flex align-items-center mb-3">
                                    <button
                                        className="btn btn-success my-2"
                                        onClick={() => handlerOpenForm()}>
                                        New
                                    </button>
                                    <input
                                        type="text"
                                        className="form-control my-2 w-50 ms-auto" 
                                        placeholder="search"
                                        onChange={onInputChange} 
                                        value={search}                                     
                                    />
                                </div>
                             </>
                            
                        }
                        {
                            filteredDestinations.length === 0
                                ? <div className="alert alert-warning">Empty List of Destinations</div>

                                : 
                                <>
                                    <DestinationsList destinations={filteredDestinations} />
                                    <Paginator url="/destinations/page" paginator={paginator}/>
                                </>
                                
                        }
                    </div>
                </div>
            </div>
        </>
    )
}