import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./body.css"; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

const Body = () => {
  const [newsItems, setNewsItems] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await axios.get("http://localhost:8800/api/newsItems");
      setNewsItems(resp.data);
    } catch (error) {
      console.error("Error fetching news items:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp=await axios.put("http://localhost:8800/api/newsItems/deleteItem",{id:id});
      fetchData();
    } catch (error) {
      console.error("Error deleting news item:", error);
    }
  };
const handleItem=async(id,url)=>{
  try{
     const resp=await axios.put("http://localhost:8800/api/newsItems/readItem",{id:id});
     window.location.href = url;
  }
  catch(error){
    console.log("Error while marking read: ", error);
  }
}
  return (
    <div className="body">
      {newsItems.map((item, index) => (
        <div key={item._id} className="news-item">
          <div className="news-title">
            <span className="serial-number">{index + 1}</span>
   <h3  onClick={()=>handleItem(item._id, item.hackerNewsUrl)} style={{cursor:"pointer"}}>{item.title}</h3> <span>({item.url})</span>
          </div>
          <div className="news-details">
            <p className="upvotes">{item.upvotes} points</p>
            <p className="postedOn">{item.postedOnText}</p>
            <p className="comments">{item.comments} comments</p>
            <button style={{cursor:"pointer"}} onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
