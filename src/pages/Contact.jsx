function Contact() {
    return (
        <div className="contact-container">

            <h1>Contact Us</h1>

            <p className="contact-intro">
                Have any questions? We are happy to help you.
            </p>

            <div className="contact-content">

                <div className="contact-info">
                    <h2>Get in Touch</h2>

                    <p>
                        <strong>Email:</strong>{" "}
                        support@example.com
                    </p>

                    <p>
                        <strong>Phone:</strong>{" "}
                        +91 98765 43210
                    </p>

                    <p>
                        <strong>Address:</strong>{" "}
                        Kerala, India
                    </p>
                </div>

                <form className="contact-form">

                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                    />

                    <label>Message</label>
                    <textarea
                        placeholder="Enter your message"
                        rows="5"
                        required
                    ></textarea>

                    <button type="submit">
                        Send Message
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Contact;