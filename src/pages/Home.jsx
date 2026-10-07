import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/thunks/productThunks";
import ProductCard from "../components/ProductCard";

function Home() {
    const dispatch = useDispatch();

    const {
        products,
        loading,
        error
    } = useSelector((state) => state.products);

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const categories = [
        "All",
        ...new Set(
            products.map((product) => product.category)
        )
    ];

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory =
            category === "All" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="home-container">

            <h1>Our Products</h1>

            <div className="product-filters">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="search-input"
                />

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    className="category-select"
                >
                    {categories.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

            </div>

            {loading && (
                <p>Loading products...</p>
            )}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {!loading && !error && (
                <>
                    <p className="product-count">
                        Showing {filteredProducts.length}{" "}
                        product(s)
                    </p>

                    <div className="product-grid">

                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(
                                (product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                )
                            )
                        ) : (
                            <p>
                                No products found.
                            </p>
                        )}

                    </div>
                </>
            )}

        </div>
    );
}

export default Home;