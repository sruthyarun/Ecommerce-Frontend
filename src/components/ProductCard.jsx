import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        navigate("/cart");
    };

    return (
        <div className="product-card">
            <img
                src={product.image}
                alt={product.name}
                className="product-image"
            />

            <h3>{product.name}</h3>

            <p className="product-category">
                Category: {product.category}
            </p>

            <p className="product-price">
                ₹{product.price}
            </p>

            <p className="product-stock">
                Stock: {product.quantity}
            </p>

            <div className="product-actions">
                <Link
                    to={`/products/${product._id}`}
                    className="view-button"
                >
                    View Details
                </Link>

                <button
                    onClick={handleAddToCart}
                    className="cart-button"
                    disabled={product.quantity === 0}
                >
                    {product.quantity === 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;