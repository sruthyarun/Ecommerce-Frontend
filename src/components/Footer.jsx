function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                <div className="footer-section">
                    <h3>E-Commerce</h3>

                    <p>
                        Your simple and secure online
                        shopping platform.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>

                    <a href="/">Home</a>
                    <a href="/cart">Cart</a>
                    <a href="/orders">Orders</a>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>

                    <p>Email: support@example.com</p>
                    <p>Phone: +91 98765 43210</p>
                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()}
                    {" "}
                    E-Commerce. All rights reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;