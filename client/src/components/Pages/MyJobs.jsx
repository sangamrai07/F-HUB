import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Css/MyJob.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function MyJobs() {

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  console.log(activeUser)

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myJobs"],
    queryFn: () =>
      newRequest.get(`/jobs?userID=${activeUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/jobs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myJobs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };
     const [editingJobId, setEditingJobId] = useState(null);

  const handleEdit = (id) => {
    setEditingJobId(id);
  };

  const handleCloseEditModal = () => {
    setEditingJobId(null);
    job.skills = []
    job.position = []
  };


   // Toast : 
  const emptyFields = () => toast("Please Fill all the fields.");


  const [image, setImage] = useState(null);
  const [newSkill, setNewSkill] = useState('');
   const [newPosition, setNewPosition] = useState('');
   const [job, setJob] = useState({
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

  const handleDescriptionChange = (e) => {
    console.log(e.target.value);
  setJob((prev) => {
    return { ...prev, description: e.target.value };
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


  const handleSaveChanges = async (e) => {
      e.preventDefault();
if (!job.companyName || !job.description || !job.phone || !job.email || !job.skills || !job.category || !job.expiryDate || !job.location) {
    emptyFields()
    return;
  }
     
   const url = image ? await upload(image) : "";

  try {
    const res = await newRequest.put(`job/${editingJobId}`, {
      ...job,
      image: url,
    });
  navigate(`/singleJob/${editingJobId}`)
  } catch (err) {
    console.log(err)
  }
  }

  return (
    <div className='myJobs'>
      <div className="container">
        <div className="title">
          <h1>My Jobs</h1>
          <Link to='/addJobs'>
            <button>Add New Job</button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Company Name</th>
            <th>Salary</th>
             <th>Action</th>
          </tr>
            { isLoading? 'Loading': error? 'Error Occurred' : data.map((Job) => (
              <tr key={Job._id}>
                <td>
                   <Link to={`/singleJob/${Job._id}`}><img className="img" src={Job.image} alt="" /></Link>
                </td>
                <td>{Job.companyName}</td>
                <td>{Job.salary}</td>
                <td>
                  <button onClick={() => handleDelete(Job._id)}>Delete</button>
                  <button onClick={() => handleEdit(Job._id)}>Edit</button>
                </td>
              </tr>
            ))}
        </table>
      </div>
       {/* Modal for editing news */}
{editingJobId && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloseEditModal}>&times;</span>
      <h2>Edit News</h2>
            <form className="edit-news-form" onSubmit={handleSaveChanges} >
               <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input type="text" id="companyName" onChange={handleChange} name="companyName" />
              </div>
              
                <div className="form-group">
          <label htmlFor="phone">Contact No:</label>
          <input type="text" id="phone" onChange={handleChange} name="phone" />
              </div>
                <div className="form-group" >
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" onChange={handleChange} name="email" />
              </div>
              <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" onChange={handleChange} name="location"  />
              </div>
                <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input type="text" id="salary" onChange={handleChange} name="salary"  />
              </div>
              <div className="form-group">
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
  <button  onClick={() => handleRemovePosition(index)} style={{ margin:'4px', padding:'4px', backgroundColor: 'white', color: 'red', width: '20px', height:'20px', border: '1px solid gray', textAlign: 'center' }}>X</button>
</div>
            ))}
          </div>
              </div>
               <div className="form-group">
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
  <button  onClick={() => handleRemoveSkill(index)} style={{ margin:'4px', padding:'4px', backgroundColor: 'white', color: 'red', width: '20px', height:'20px', border: '1px solid gray', textAlign: 'center' }}>X</button>
</div>
            ))}
          </div>
              </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" onChange={handleDescriptionChange} name="description" rows="4" cols="50" placeholder="Enter description.."></textarea>
              </div>
       
                <div className="form-group">
         <label htmlFor="category">Category:</label>
          <input type="text" onChange={handleChange} name='category' />   
              </div>
               <div className="form-group">
         <label htmlFor="expiryDate">Expiration Date:</label>
          <input type="text" onChange={handleChange} name='expiryDate' />   
              </div>
        <div className="form-group">
  <label htmlFor="image">Cover Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} name='image' /> 
        </div>
        <button type='submit' >Save</button>
      </form>
    </div>
  </div>
)}
    </div>
  )
} 

export default MyJobs
