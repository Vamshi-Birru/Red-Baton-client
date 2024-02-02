import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hacker News</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span>Welcome, {user.username}</span>
            <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <Link to={"/register"}><button className="navButton" >Register</button></Link>
            <Link to={"/login"}><button className="navButton" >Login</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
