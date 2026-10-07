import { useDispatch } from "react-redux";

import {
    removeFromCart,
    updateQuantity
} from "../redux/slices/cartSlice";

function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        const quantity = Number(e.target.value);

        if (quantity >= 1) {
            dispatch(
                updateQuantity({
                    id: item._id,
                    quantity
                })
            );
        }
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item._id));
    };

    return (
        <div className="cart-item">

            <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
            />

            <div className="cart-item-info">

                <h3>{item.name}</h3>

                <p>
                    Price: ₹{item.price}
                </p>

                <div className="quantity-control">

                    <label>
                        Quantity:
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                    />

                </div>

                <p>
                    Subtotal: ₹
                    {item.price * item.quantity}
                </p>

                <button
                    className="remove-button"
                    onClick={handleRemove}
                >
                    Remove
                </button>

            </div>

        </div>
    );
}

export default CartItem;