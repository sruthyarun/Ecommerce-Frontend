import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import { fetchProductById } from "../redux/thunks/productThunks";
import { addToCart } from "../redux/slices/cartSlice";

function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        selectedProduct,
        loading,
        error
    } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        if (
            selectedProduct &&
            selectedProduct.quantity > 0
        ) {
            dispatch(addToCart(selectedProduct));
            navigate("/cart");
        }
    };

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (error) {
        return (
            <p className="error-message">
                {error}
            </p>
        );
    }

    if (!selectedProduct) {
        return <p>Product not found.</p>;
    }

    return (
        <div className="product-detail">

            <Link to="/" className="back-link">
                ← Back to Products
            </Link>

            <div className="product-detail-card">

                <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="product-detail-image"
                />

                <div className="product-detail-info">

                    <h1>{selectedProduct.name}</h1>

                    <p className="product-category">
                        Category: {selectedProduct.category}
                    </p>

                    <p className="product-description">
                        {selectedProduct.description}
                    </p>

                    <h2>
                        ₹{selectedProduct.price}
                    </h2>

                    <p className="product-stock">
                        Available Stock:{" "}
                        {selectedProduct.quantity}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        className="cart-button"
                        disabled={
                            selectedProduct.quantity === 0
                        }
                    >
                        {selectedProduct.quantity === 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductDetail;