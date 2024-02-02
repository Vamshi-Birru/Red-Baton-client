import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./body.css"; // Import your CSS file for styling


const Body = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // Set loading state to true when fetching data
    try {
      const resp = await axios.get("https://red-baton-server.onrender.com/api/newsItems");
      setNewsItems(resp.data);
    } catch (error) {
      console.error("Error fetching news items:", error);
      toast.error("Error fetching news items");
    } finally {
      setLoading(false); // Set loading state to false when fetching is done
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp=await axios.put("https://red-baton-server.onrender.com/api/newsItems/deleteItem",{id:id});
      fetchData();
      toast.success("News item deleted successfully");
    } catch (error) {
      console.error("Error deleting news item:", error);
      toast.error("Error deleting news item");
    }
  };

  const handleItem=async(id,url)=>{
    try{
       const resp=await axios.put("https://red-baton-server.onrender.com/api/newsItems/readItem",{id:id});
       await fetchData();
       window.location.href = url;
    }
    catch(error){
      console.log("Error while marking read: ", error);
      toast.error("Error marking news item as read");
    }
  };

  return (
    <div className="body">
      <ToastContainer />
      {loading && <div>Loading...</div>} 
    { !loading&&<div>{newsItems.map((item, index) => (
      <div key={item._id} className="news-item">
        <div className="news-title">
          <span className="serial-number">{index + 1}</span>
          <h3 onClick={()=>handleItem(item._id, item.hackerNewsUrl)} style={{cursor:"pointer",color: item.read ? "grey" : "inherit"}}>{item.title}</h3> <span>({item.url})</span>
        </div>
        <div className="news-details">
          <p className="upvotes">{item.upvotes} points</p>
          <p className="postedOn">{item.postedOnText}</p>
          <p className="comments">{item.comments} comments</p>
          <button style={{cursor:"pointer"}} onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      </div>
    ))}</div> }
    </div>
  );
};

export default Body;
