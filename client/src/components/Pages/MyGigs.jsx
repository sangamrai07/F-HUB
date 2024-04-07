import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Css/MyGigs.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function MyGigs() {

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  console.log(activeUser)

    const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userID=${activeUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

    const [editingGigId, setEditingGigId] = useState(null);

  const handleEdit = (id) => {
    setEditingGigId(id);
  };

  const handleCloseEditModal = () => {
    setEditingGigId(null);
    gig.features = []
  };


   // Toast : 
  const emptyFields = () => toast("Please Fill all the fields.");
  const priceTypeError = () => toast("Price must be a number.");
  const revTypeError = ()=> toast("Revision times must be a number.");

  const [coverImage, setCoverImage] = useState(null);
  const [newFeature, setNewFeature] = useState('');
   const [gig, setGig] = useState({
    title:"",
     serviceTitle: "",
     price: 0,
     description: "",
     category: "",
     revisionNumber: "",
     features: [],
     deliveryTime: "",
     shortDesc: "",
     coverImg: ""
  });

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


  const handleSaveChanges = async (e) => {
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
    const res = await newRequest.put(`gigs/${editingGigId}`, {
      ...gig,
      coverImg: url,
    });
  navigate(`/singleGig/${editingGigId}`)
  } catch (err) {
    console.log(err)
  }
  }
  return (
    <div className='myGigs'>
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to='/addGigs'>
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
             <th>Action</th>
          </tr>
            { isLoading? 'Loading': error? 'Error Occurred' : data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <Link to={`/singleGig/${gig._id}`}><img className="img" src={gig.coverImg} alt="" /></Link>
                </td>
                <td>{gig.title.slice(0, 50)}...</td>
                <td>{gig.price}</td>
                <td>
                  <button onClick={() => handleDelete(gig._id)}>Delete</button>
                  <button onClick={() => handleEdit(gig._id)}>Edit</button>
                </td>
              </tr>
            ))}
        </table>
      </div>
      {/* Modal for editing news */}
{editingGigId && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloseEditModal}>&times;</span>
      <h2>Edit News</h2>
            <form className="edit-news-form" onSubmit={handleSaveChanges} >
               <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" onChange={handleChange} name="title" placeholder="Enter title.." />
              </div>
              
                <div className="form-group">
          <label htmlFor="serviceTitle">Short Title:</label>
          <input type="text" id="serviceTitle" onChange={handleChange} name="serviceTitle" placeholder="Enter short title.." />
              </div>
                <div className="form-group" >
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" onChange={handleChange} name="price" placeholder="Enter price.." />
              </div>
              <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" onChange={handleChange} name="category" placeholder="Enter category.." />
              </div>
                <div className="form-group">
          <label htmlFor="revisionNumber">Revisions:</label>
          <input type="text" id="revisionNumber" onChange={handleChange} name="revisionNumber" placeholder="Enter revision times.." />
              </div>
              <div className="form-group">
                 <label htmlFor="features">Features:</label>
          <div className="features">   
          <input
            type="text"
              name='features'
              value={newFeature}
              style={{ width: '550px' }}
            onChange={(e) => setNewFeature(e.target.value)}
          />
          <button type='button' onClick={handleAddFeature}>ADD</button></div>
        
          <div className="addedFeatures">
              
            {gig.features.map((feature, index) => (
              <div className='featureItems' key={index}>
  {feature} 
  <button type='button'  onClick={() => handleRemoveFeature(index)} style={{ margin:'4px', padding:'4px', backgroundColor: 'white', color: 'red', width: '20px', height:'20px', border: '1px solid gray', textAlign: 'center' }}>X</button>
</div>
            ))}
          </div>
              </div>
                <div className="form-group">
          <label htmlFor="deliveryTime">Delivery Time:</label>
          <input type="text" id="deliveryTime" onChange={handleChange} name="deliveryTime" placeholder="Enter delivery time.." />
              </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" onChange={handleDescriptionChange} name="description" rows="4" cols="50" placeholder="Enter description.."></textarea>
              </div>
                <div className="form-group">
          <label htmlFor="shortDesc">Short Description:</label>
          <textarea id="shortDesc" onChange={handleDescriptionChange} name="shortDesc" rows="4" cols="50" placeholder="Enter short description.."></textarea>
        </div>
       
        <div className="form-group">
            <label htmlFor="">Cover Image: </label>
          <input
              type="file"
              name="coverImg"
        accept="image/*"
        multiple
       onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>
        <button type='submit' >Save</button>
      </form>
    </div>
  </div>
)}
    </div>
  )
} 

export default MyGigs
