import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <h1 className="text-center">All Right Reserved &copy;Techinfoyt</h1>
      <p className="text-center mt-3">
        <Link to="/about">ABOUT</Link>|<Link to="/contact">CONTACT</Link>|
        <Link to="/policy">PRIVACY POLICY</Link>
      </p>
    </div>
  );
}

export default Footer;
