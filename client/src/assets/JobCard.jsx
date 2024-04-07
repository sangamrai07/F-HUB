import React from 'react';
import './css/jobCard.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';

function JobCard({ item }) {

  const { isPending, error, data } = useQuery({
    queryKey: [item.userID],
     queryFn: () => newRequest.get(`/users/${item.userID}`).then((res) => {
      return res.data;
    })
  });


  return (
    <Link to={`/singleJob/${item._id}`} className='link'>
      <div className='jobCard'>
        <div className="info">
          {isPending ? "Pending" : error ? "Error Occurred" : (
            <div className="user">
             <img src={data.image} alt="" />
            <span>{data.username}</span>
            </div>
          )}
                  <p>{item.description.slice(0, 200)}...</p>
                    <img src={item.image} className="coverImg" alt="" />
              </div>        
        <div className="details">
          <div className="Skills">
            <span>Salary:</span>
            <h2>{item.salary}</h2>
          </div>
              </div>
      </div>
    </Link>
  );
}

export default JobCard;
