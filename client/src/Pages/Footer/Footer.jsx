import logo from "../../assets/logo.png"

const Footer = () => {
    return (
        <div className="mt-10">
            <footer className="footer bg-teal-700 text-white p-10">
                <aside>
                    <img src={logo} className="w-24" alt="" />
                    <p>
                        MediCo Ltd.
                        <br />
                        Providing reliable tech since 2024
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer footer-center  bg-teal-700 text-white p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by MediCo Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;