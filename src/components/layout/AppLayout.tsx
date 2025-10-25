import { Outlet } from "react-router-dom";
import AppProvider from "../../Context/AppProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppLayout = () => {
    return ( 
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <ToastContainer />
                <Outlet />
            </AppProvider>
        </QueryClientProvider>
     );
}
 
export default AppLayout;