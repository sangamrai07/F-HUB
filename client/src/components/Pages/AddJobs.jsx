import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Css/AddJobs.scss'
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function AddJobs() {
  const [image, setImage] = useState(null);
  const [newSkill, setNewSkill] = useState('');
   const [newPosition, setNewPosition] = useState('');
  const [job, setJob] = useState({
    userID: JSON.parse(localStorage.getItem("activeUser"))?._id,
  companyName: "",
  image: "",
    phone: "",
    email: "",
    skills: [],
    description: "",
    location: "",
    position: [],
    category: "",
    salary: "",
    expiryDate: ""
  });

   // Toast : 
  const emptyFields = () => toast("Please Fill all the fields.");


  const handleDescriptionChange = (e) => {
    console.log(e.target.value);
  setJob((prev) => {
    return { ...prev, description: e.target.value, shortDesc: e.target.value };
  });
};
  const handleChange = (e) => {
       console.log(e.target.value);
    setJob((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
    const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setJob((prev) => {
        return { ...prev, skills: [...prev.skills, newSkill.trim()] };
      });
      setNewSkill('');
    }
    };
  
   const handleAddPosition = () => {
    if (newPosition.trim() !== '') {
      setJob((prev) => {
        return { ...prev, position: [...prev.position, newPosition.trim()] };
      });
      setNewPosition('');
    }
  };

    const handleRemoveSkill = (indexToRemove) => {
    setJob((prev) => {
      return { ...prev, skills: prev.skills.filter((_, index) => index !== indexToRemove) };
    });
    };
  
  const handleRemovePosition = (indexToRemove) => {
    setJob((prev) => {
      return { ...prev, position: prev.position.filter((_, index) => index !== indexToRemove) };
    });
  };
  
  const navigate = useNavigate();
 const handleSubmit = async (e) => {
   e.preventDefault();
   
   if (!job.companyName || !job.description || !job.phone || !job.email || !job.skills || !job.category || !job.expiryDate || !job.location) {
    emptyFields()
    return;
  }
  const url = image ? await upload(image) : "";

  try {
    const res = await newRequest.post("/jobs", {
      ...job,
      image: url,
    });
  navigate('/myJobs')
  } catch (err) {
    console.log(err)
  }
};

  const handleCancel = async(e) => {
    navigate('/myJobs')
  }
  
  return (
    <div className='addJobs'>
      <h1>Add New Job</h1>
      <div className="container">
      <div className="left">
        <label htmlFor="companyName">Company Name:</label>
        <input type="text"  onChange={handleChange} name='companyName' />
         <label htmlFor="phone">Contact No:</label>
        <input type="text"  onChange={handleChange} name='phone' />
         <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            className='txtArea'
             onChange={handleDescriptionChange}
              id=""
                placeholder="Detailed description of your job..."
              cols="3"
              rows="70"
          ></textarea>
        
       
           <label htmlFor="salary">Salary:</label>
          <input type="text" onChange={handleChange} name='salary' />   
          <label htmlFor="expiryDate">Expiration Date:</label>
          <input type="text"  onChange={handleChange} name='expiryDate' />   
      </div>
      <div className="right">
          <label htmlFor="image">Cover Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} name='image' /> 
          <label htmlFor="skills">Skills:</label>
          <div className="skills">   
          <input
            type="text"
              name='skills'
              value={newSkill}
              style={{ width: '550px' }}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button onClick={handleAddSkill}>ADD</button></div>
        
          <div className="addedSkills">
              
            {job.skills.map((skill, index) => (
              <div className='skillItems' key={index}>
  {skill} 
  <button  onClick={() => handleRemoveSkill(index)} style={{ marginLeft: '8px', backgroundColor: 'white', width: '20px', border: '1px solid gray' }}>X</button>
</div>
            ))}
          </div>
           <label htmlFor="position">Position:</label>
          <div className="skills">   
          <input
            type="text"
              name='position'
              value={newPosition}
              style={{ width: '550px' }}
            onChange={(e) => setNewPosition(e.target.value)}
          />
          <button onClick={handleAddPosition}>ADD</button></div>
        
          <div className="addedSkills">
              
            {job.position.map((position, index) => (
              <div className='skillItems' key={index}>
  {position} 
  <button  onClick={() => handleRemovePosition(index)} style={{ marginLeft: '8px', backgroundColor: 'white', width: '20px', border: '1px solid gray' }}>X</button>
</div>
            ))}
          </div>
           <label htmlFor="email">Email:</label>
          <input type="text" onChange={handleChange} name='email' />   
            <label htmlFor="location">Location:</label>
          <input type="text" onChange={handleChange} name='location' />   
           <label htmlFor="category">Category:</label>
          <input type="text" onChange={handleChange} name='category' />   
          <div className="btns">
            <button className='addBtn' onClick={handleSubmit}>CREATE</button>
          <button className='cancelBtn' onClick={handleCancel}>CANCEL</button>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}

export default AddJobs

