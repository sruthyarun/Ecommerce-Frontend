import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../redux/thunks/orderThunks";

function Orders() {
    const dispatch = useDispatch();

    const {
        orders,
        loading,
        error
    } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="orders-container">
                <h1>My Orders</h1>
                <p>Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-container">
                <h1>My Orders</h1>
                <p className="error-message">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="orders-container">

            <h1>My Orders</h1>

            {orders.length === 0 ? (
                <div className="no-orders">
                    <p>You haven't placed any orders yet.</p>
                </div>
            ) : (

                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className="order-card"
                        >

                            <div className="order-header">

                                <div>
                                    <h3>
                                        Order #{order._id}
                                    </h3>

                                    <p>
                                        Shipping Address:{" "}
                                        {order.shippingAddress}
                                    </p>
                                </div>

                                <span
                                    className={`order-status ${order.status?.toLowerCase()}`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            <div className="order-items">

                                <h4>Order Items</h4>

                                {order.items?.map(
                                    (item, index) => (

                                        <div
                                            key={index}
                                            className="order-item"
                                        >

                                            <div>
                                                <strong>
                                                    {item.product?.name}
                                                </strong>

                                                <p>
                                                    Category:{" "}
                                                    {item.product?.category}
                                                </p>
                                            </div>

                                            <div>
                                                <p>
                                                    Price: ₹
                                                    {item.product?.price}
                                                </p>

                                                <p>
                                                    Quantity:{" "}
                                                    {item.quantity}
                                                </p>
                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                            <div className="order-footer">

                                <strong>
                                    Total: ₹
                                    {order.totalAmount}
                                </strong>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Orders;