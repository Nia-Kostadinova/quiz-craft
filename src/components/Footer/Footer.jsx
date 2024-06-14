import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="logo.png" alt="Site Logo" />
                </div>
                <div className="footer-links">
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/faq">FAQs</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 ArtQuest</p>
            </div>
        </footer>
    );
}

export default Footer;
