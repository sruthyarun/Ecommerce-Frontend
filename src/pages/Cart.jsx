import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
    removeFromCart,
    updateQuantity,
    clearCart
} from "../redux/slices/cartSlice";

import { createOrder } from "../redux/thunks/orderThunks";
import CartItem from "../components/CartItem";

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector(
        (state) => state.cart.items
    );

    const [shippingAddress, setShippingAddress] = useState({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India"
    });

    const totalPrice = items.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const handleAddressChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleQuantityChange = (id, quantity) => {
        dispatch(
            updateQuantity({
                id,
                quantity: Number(quantity)
            })
        );
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = async () => {
        if (items.length === 0) {
            return;
        }

        if (
            !shippingAddress.street ||
            !shippingAddress.city ||
            !shippingAddress.state ||
            !shippingAddress.postalCode
        ) {
            alert("Please enter your shipping address.");
            return;
        }

        try {
            const orderData = {
                items: items.map((item) => ({
                    product: item._id,
                    quantity: item.quantity
                })),

                shippingAddress: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.postalCode}, ${shippingAddress.country}`,

                totalAmount: totalPrice
            };

            await dispatch(
                createOrder(orderData)
            );

            dispatch(clearCart());

            navigate("/orders");

        } catch (error) {
            console.error(
                "Checkout error:",
                error
            );

            alert(error.message);
        }
    };

    if (items.length === 0) {
        return (
            <div className="cart-container empty-cart">

                <h1>Your Cart</h1>

                <p>Your cart is empty.</p>

                <Link to="/">
                    Continue Shopping
                </Link>

            </div>
        );
    }

    return (
        <div className="cart-container">

            <h1>Your Cart</h1>

            <div className="cart-list">
                {items.map((item) => (
                    <CartItem
                        key={item._id}
                        item={item}
                    />
                ))}
            </div>
            {/* Shipping Address */}

            <div className="shipping-address">

                <h2>Shipping Address</h2>

                <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                />

                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={handleAddressChange}
                />

                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                />

            </div>

            <div className="cart-summary">

                <h2>
                    Total: ₹{totalPrice}
                </h2>

                <button
                    className="clear-cart-button"
                    onClick={() =>
                        dispatch(clearCart())
                    }
                >
                    Clear Cart
                </button>

                <button
                    className="checkout-button"
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </button>

            </div>

        </div>
    );
}

export default Cart;