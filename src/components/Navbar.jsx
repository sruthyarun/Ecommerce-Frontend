import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <Link to="/">E-Commerce</Link>
            </div>

            <div className="navbar-links">

                <Link to="/">Home</Link>

                {user && (
                    <>
                        <Link to="/">Products</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/orders">Orders</Link>
                    </>
                )}
                <Link to="/contact">Contact</Link>

                {user ? (
                    <>
                        <span className="welcome">
                            Hi, {user.name}
                        </span>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}

            </div>

        </nav>
    );
}

export default Navbar;