import { Navigate, Outlet } from "react-router-dom";

export function RutasPrivadas()
{
    let auth = true; // Aqui añadiremos la logia de autentiicacion

    

    return(
        auth ? <Outlet />: <Navigate to ='/' />
        
    )
}