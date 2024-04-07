import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Css/AddNews.scss'
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function AddNews() {
  const [image, setImage] = useState([]);
  const [news, setNews] = useState({
    userID: JSON.parse(localStorage.getItem("activeUser"))?._id,
    caption:"",
    image: [],
    description: "",
    likes: 0
  });

  const handleDescriptionChange = (e) => {
    console.log(e.target.value);
  setNews((prev) => {
    return { ...prev, description: e.target.value };
  });
};
  const handleChange = (e) => {
       console.log(e.target.value);
    setNews((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
     const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage(files);
  };
  
   // Toast : 
  const emptyFields = () => toast("Please Fill all the fields.");

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   
   if (!news.caption || !news.description) {
    emptyFields()
    return;
  }
  
     let imageUrls = [];
  
  for (const imgFile of image) {
    const imgUrl = imgFile ? await upload(imgFile) : "";
    imageUrls.push(imgUrl);
  }

  try {
    const res = await newRequest.post("/news", {
      ...news,
      image: imageUrls,
    });
  navigate('/myNews')
  } catch (err) {
    console.log(err)
  }
};

  const handleCancel = async(e) => {
    navigate('/myNews')
  }
  
  return (
    <div className='addNews'>
      <h1>Add News Post</h1>
      <div className="container">
      <div className="left">
        <label htmlFor="Caption">Caption:</label>
        <input type="text"  onChange={handleChange} name='caption' />
         <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            className='txtArea'
             onChange={handleDescriptionChange}
              id=""
                placeholder="news details..."
              cols="3"
              rows="70"
          ></textarea>
            <input
              type="file"
              name="image"
        accept="image/*"
        multiple
        onChange={handleImageChange}
          />
            <div className="btns">
            <button className='addBtn' onClick={handleSubmit}>CREATE</button>
          <button className='cancelBtn' onClick={handleCancel}>CANCEL</button>
          </div>
      </div>
      </div>  
    </div>
  )
}

export default AddNews