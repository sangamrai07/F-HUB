import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Css/AddGigs.scss'
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function AddGigs() {
  const [coverImage, setCoverImage] = useState(null);
 const [newFeature, setNewFeature] = useState('');
  const [gig, setGig] = useState({
    userID: JSON.parse(localStorage.getItem("activeUser"))?._id,
  title: "",
  coverImg: "",
    description: "",
    category: "",
    serviceTitle: "",
  revisionNumber: 0,
  features: [],
  price: 0,
  shortDesc: "",
  deliveryTime: 0,
  });


  // Toast : 
  const emptyFields = () => toast("Please Fill all the fields.");
  const priceTypeError = () => toast("Price must be a number.");
  const revTypeError = ()=> toast("Revision times must be a number.");

  const handleDescriptionChange = (e) => {
    console.log(e.target.value);
  setGig((prev) => {
    return { ...prev, description: e.target.value, shortDesc: e.target.value };
  });
};
  const handleChange = (e) => {
       console.log(e.target.value);
    setGig((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
    const handleAddFeature = () => {
    if (newFeature.trim() !== '') {
      setGig((prev) => {
        return { ...prev, features: [...prev.features, newFeature.trim()] };
      });
      setNewFeature('');
    }
  };

    const handleRemoveFeature = (indexToRemove) => {
    setGig((prev) => {
      return { ...prev, features: prev.features.filter((_, index) => index !== indexToRemove) };
    });
  };
  
  const navigate = useNavigate();
 const handleSubmit = async (e) => {
   e.preventDefault();
   
   if (!gig.title || !gig.price || !gig.description || !gig.category || !gig.serviceTitle || !gig.revisionNumber || !gig.features || !gig.shortDesc) {
    emptyFields()
    return;
   }
   
     if (isNaN(gig.price)) {
    priceTypeError();
    return;
  }

  
  if (isNaN(gig.revisionNumber)) {
    revTypeError();
    return;
  }
  const url = coverImage ? await upload(coverImage) : "";

  try {
    const res = await newRequest.post("/gigs", {
      ...gig,
      coverImg: url,
    });
  navigate('/myGigs')
  } catch (err) {
    console.log(err)
  }
};

  
  return (
    <div className='addGigs'>
      <h1>Add New Gig</h1>
      <div className="container">
      <div className="left">
        <label htmlFor="title">Title:</label>
        <input type="text"  onChange={handleChange} name='title' />
         <label htmlFor="price">Price:</label>
        <input type="text"  onChange={handleChange} name='price' />
         <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            className='txtArea'
             onChange={handleDescriptionChange}
              id=""
                placeholder="Detailed description of your gig..."
              cols="3"
              rows="30"
            ></textarea>
         <label htmlFor="revisions">Revisions:</label>
          <input type="text"  onChange={handleChange} name='revisionNumber' />   
                    <button className='addBtn' onClick={handleSubmit}>CREATE</button>
  
      </div>
      <div className="right">
          <label htmlFor="ShortTitle">Short Title:</label>
        <input type="text"  onChange={handleChange} name='serviceTitle' />     
    <label htmlFor="category">Category:</label>
        <input type="text"  onChange={handleChange} name='category' />     
         <label  htmlFor="shortDesc">Short Description:</label>
         <textarea
            name="shortDesc"
            className='txtArea2'
             onChange={handleDescriptionChange}
              id=""
              placeholder="Short description of your gig..."
              cols="3"
              rows="30"
            ></textarea>
          <label htmlFor="coverImg">Cover Image:</label>
          <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} name='coverImg' /> 
          <label htmlFor="features">Features:</label>
          <div className="features">   
          <input
            type="text"
              name='features'
              value={newFeature}
              style={{ width: '550px' }}
            onChange={(e) => setNewFeature(e.target.value)}
          />
          <button onClick={handleAddFeature}>ADD</button></div>
        
          <div className="addedFeatures">
              
            {gig.features.map((feature, index) => (
              <div className='featureItems' key={index}>
  {feature} 
  <button  onClick={() => handleRemoveFeature(index)} style={{ marginLeft: '8px', backgroundColor: 'white', width: '20px', border: '1px solid gray' }}>X</button>
</div>
            ))}
          </div>
           
         <label htmlFor="delivery">Delivery Time:</label>
        <input type="text" onChange={handleChange}   placeholder="eg: 2 days..." name='deliveryTime' />
        </div>
        </div>
    </div>
  )
}

export default AddGigs

