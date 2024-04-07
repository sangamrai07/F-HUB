import React from 'react'
import './css/SingleJob.scss'
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import featureImg from './img/featureImg.png'
import locationImg from './img/location.png'

function SingleJob() {

    const { id } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['singleJob'],
        queryFn: () =>
            newRequest.get(`/jobs/singleJob/${id}`).then((res) => {
                return res.data;
            })
    });

     const userID = data?.userID;

    const { isPending: isPendingUser, error: errorUser, data: dataUser } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
           newRequest.get(`/users/${userID}`).then((res) => {
                return res.data;
           }),
        enabled: !!userID
    })


    return (
        <div className='singleJob'>
            {isPending ? "Loading" : error ? "Error Occurred." : <div className="container">

                  {/* // Left */}
                <div className="left">
                    <h1>{data.companyName}</h1>
                    {isPendingUser ? "Loading" : errorUser ? "Error Occured." :
                        <div className="user">
                            <img className='prf' src={dataUser.image} alt="" />
                            <span>{dataUser.username}</span>
                        </div>}
                      <div className="coverImg">

                         <img src={data.image} alt="Cover"  />

                    </div>
                    <h4><img src={locationImg} alt="" />{data.location}</h4>
                    <p>{data.description}</p>
                    <br />
                    <br />
                      <h2>About the Recruiter</h2>
                    {isPendingUser ? "Loading" : errorUser ? "Error Occurred." :
                        <div className="sellerInfo">
                                <div className="sellerImg"><img className='sellerPrf' src={dataUser.image} alt="" /></div>
                               
                                <div className="sellerContact">
                                    <h3>{dataUser.username}</h3>
                                    <h5>{dataUser.description}</h5>
                                    <h5>{dataUser.email}</h5>
                                </div>
                        </div>}
                       <div className="hiringDetails">
                        <h2>Deadline:  {data.expiryDate}</h2>
                       
                        <h3> Send us you CV/Resume at: <span>{data.email} </span>before the deadline.</h3>
                    </div>
                </div>

                {/* // Right */}
                <div className='right'>
                          <h2>For the Position:</h2>
                   <div className="List">
                        {data.position.map((ed, index) => (
      <div key={index} className='listItem'> <img src={featureImg} alt="" /> <p>{ed}</p></div>   
                        ))}                       
                    </div>
                    <br />
                    <hr />
                     <h2>Skills:</h2>
                   <div className="List">
                        {data.skills.map((skill, index) => (
      <div key={index} className='listItem'> <img src={featureImg} alt="" /> <p>{skill}</p></div>   
  ))}
                    </div>
                    <br />
                      <hr />
                         <div className='contactInfo'>
                    <h2>Company Details: </h2>
                    <h4>Email: {data.email}</h4>
                    <h4>Contact No: {data.phone}</h4>
                     <h4>Location: {data.location}</h4>
                    </div>
                 
                </div>      
            </div>}
        </div>

    )
}

export default SingleJob;
