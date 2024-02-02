import axios from "axios";
import { useContext,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";



const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    
    

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e, field) => {
            const { id, value } = e.target;
            setCredentials((prev) => ({ ...prev, [id]: value }));

    };

    
    





    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER_START" });
        try {
            const res = await axios.post("http://localhost:8800/api/auth/register", credentials);
            dispatch({ type: "RESISTER_SUCCESS", payload: res.data.details });
            alert(res);
            
            navigate("/")
        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
            console.log("ERROR: ", err);
        }
    };


    return (
        <div className="register">
            <div className="rContainer">

                <input type="text" placeholder="Username" id="username" onChange={handleChange} className="rInput" required />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="rInput" required />
                <button disabled={loading} onClick={handleClick} className="rButton">
                    Register
                </button>
                {error && <span className="er">{error.message}</span>}
            </div>
        </div>
    );
};

export default Register;

