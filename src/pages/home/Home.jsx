import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Body from "../../components/body/body";

import "./home.css";

const Home = () => {
  return (
    <div className="container" >
      <Navbar />
      
      <Body/>
       
        <Footer/>
      
    </div>
  );
};

export default Home;
