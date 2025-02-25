import { Route, Routes } from "react-router-dom"
import { DestinationsRoutes } from "./routes/DestinationsRoutes"

export const AppRoutes = () => {

    return (
        <Routes>                  
          <>                     
             <Route path="/*" element= { <DestinationsRoutes/> } />
          </>            
        </Routes>
    )
}