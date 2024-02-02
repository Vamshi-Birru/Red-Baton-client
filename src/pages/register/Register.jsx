import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./register.css";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e, field) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [id]: value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER_START" });
        try {
            const res = await axios.post("https://red-baton-server.onrender.com/api/auth/register", credentials);
           
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
            toast.success("Registration successful");
            navigate("/");
        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
            toast.error("Registration failed. Please try again.");
            console.log("ERROR: ", err);
        }
    };

    return (
        <div className="register">
            <ToastContainer />
            <div className="rContainer">
                <input type="text" placeholder="Username" id="username" onChange={handleChange} className="rInput" required />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="rInput" required />
                <button disabled={loading} onClick={handleClick} className="rButton">
                    Register
                </button>
               
            </div>
        </div>
    );
};

export default Register;
