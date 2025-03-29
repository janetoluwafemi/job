import React from 'react';
import image from '../image/product-page-examples-blog-post-image.png'; // Make sure this path is correct
import { Link } from 'react-router-dom';
import '../styles/page.css';

function Page() {
    return (
        <div className="page-container">
            <header className="header">
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/sign_up" className="nav-link">Register</Link></li>
                        <li><Link to="/about_us" className="nav-link">About Us</Link></li>
                    </ul>
                </nav>
            </header>

            <div className="image-container">
                <img src={image} alt="Product" className="product-image" />
            </div>

            <section className="content">
                <div className="text-content">
                    <h1 className="welcome-text">Welcome To Our App</h1>
                    <p className="description">We are excited to have you explore our app. Join us and start building amazing things!</p>
                </div>
            </section>
        </div>
    );
}

export default Page;
