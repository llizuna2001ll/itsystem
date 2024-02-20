import JwtService from "../services/JwtService";
import AuthenticationPage from "./AuthenticationPage";
import AdminNavigation from "../components/AdminNavigation";

function AdminDashboard() {
    const token = localStorage.getItem("jwt");
    if (token) {
        if (!JwtService.isTokenExpired()) {
            return (
                <>  
                    <AdminNavigation/>

                </>
            )
        } else {
            return (
                <AuthenticationPage/>
            );
        }
    } else {
        return (
            <AuthenticationPage/>
        );
    }
}

export default AdminDashboard;