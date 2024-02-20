import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Navbarr from "./components/Navbar";
import Societe from "./pages/Societe";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import Services from "./pages/Services";
import Category1 from "./components/Category1";
import AllProductsPage from "./pages/AllProductsPage";
import ProductPage from "./pages/ProductPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (

        <div className="App">

            <Router>
                <Navbarr/>
                <div className={"bg-transparent"}>
                    <SmoothScroll>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/societe" element={<Societe/>}></Route>
                            <Route path="/services" element={<Services/>}></Route>
                            <Route path="/category1" element={<Category1/>}></Route>
                            <Route path="/products/:categoryName" element={<AllProductsPage/>}></Route>
                            <Route path="/products/:categoryName/:productName" element={<ProductPage/>}></Route>
                            <Route path="/admin" element={<AdminDashboard/>}></Route>
                        </Routes>
                    </SmoothScroll>
                </div>
                <Footer/>
            </Router>
        </div>

    );
}

export default App;
