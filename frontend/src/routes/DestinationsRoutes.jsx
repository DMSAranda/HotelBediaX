import { Navigate, Route, Routes } from "react-router-dom"
import { DestinationsPage } from "../pages/DestinationsPage"
import { Navbar } from "../components/layout/Navbar"

export const DestinationsRoutes = () => {

    return (
        <>
                <Navbar/>
                <Routes>
                    <Route path="/destinations" element={<DestinationsPage />} />

                    <Route path="/destinations/page/:page" element={<DestinationsPage />} />
                   
                    <Route path="/" element={<Navigate to="/destinations" />} />
                </Routes>
        </>
    )
}