import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/MyJob.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import upload from '../../utils/upload';
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function MyNews() {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  
const [image, setImage] = useState([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myNews"],
    queryFn: () =>
      newRequest.get(`/news?userID=${activeUser._id}`).then((res) => {
        return res.data;
      }),
  });

   
   // Toast : 
  const emptyFields = () => toast("Please Fill all the fields.");

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/news/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myNews"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  // State to manage which news post is being edited

   const [news, setNews] = useState({
    caption:"",
    description: "",
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

  const [editingNewsId, setEditingNewsId] = useState(null);

  const handleEdit = (id) => {
    setEditingNewsId(id);
  };

  const handleCloseEditModal = () => {
    setEditingNewsId(null);
  };

  const handleSaveChanges = async (e) => {
      e.preventDefault();
  if (!news.caption || !news.description) {
    emptyFields()
    return;
  }

   
     let imageURLs = [];
  
  for (const imgFile of image) {
    const imgUrl = imgFile ? await upload(imgFile) : "";
    imageURLs.push(imgUrl);
  }

  try {
    const res = await newRequest.put(`news/${editingNewsId}`, {
      ...news,
      image: imageURLs
    });
    navigate(`/singleNews/${editingNewsId}`)
    

  } catch (err) {
    console.log("This is error: "+ err)
  }
  }

  return (
    <div className='myJobs'>
      <div className="container">
        <div className="title">
          <h1>My News Post</h1>
          <Link to='/addNews'>
            <button>Add News Post</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Caption</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { isLoading? 'Loading': error? 'Error Occurred' : data.map((news) => (
              <tr key={news._id}>
                <td>
                  <Link to={`/singleNews/${news._id}`}><img className="img" src={news.image} alt="" /></Link>
                </td>
                <td>{news.caption}</td>
                <td>
                  <button onClick={() => handleDelete(news._id)}>Delete</button>
                  <button onClick={() => handleEdit(news._id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing news */}
{editingNewsId && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloseEditModal}>&times;</span>
      <h2>Edit News</h2>
      <form className="edit-news-form" onSubmit={handleSaveChanges}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" onChange={handleDescriptionChange} name="description" rows="4" cols="50" placeholder="Enter description"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="caption">Caption:</label>
          <input type="text" id="caption" onChange={handleChange} name="caption" placeholder="Enter caption" />
        </div>
        <div className="form-group">
            <label htmlFor="">Images: </label>
          <input
              type="file"
              name="image"
        accept="image/*"
        multiple
        onChange={handleImageChange}
          />
        </div>
        <button type="submit" >Save</button>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default MyNews;
