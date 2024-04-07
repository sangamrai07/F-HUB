import React from 'react'
import './css/SingleGig.scss'
import myImg from './img/stars.png'
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import Reviews from './Reviews';
import deliveryImg from './img/clock.png'
import revisionImg from './img/revisionTime.png'
import featureImg from './img/featureImg.png'

function SingleGig() {

    const { id } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['singleGig'],
        queryFn: () =>
            newRequest.get(`/gigs/singleGig/${id}`).then((res) => {
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
        <div className='singleGig'>
            {isPending ? "Loading" : error ? "Error Occurred." : <div className="container">
                <div className="left">
                    <span className="catName"> Category : {data.category}</span>
                    <h1>{data.title}</h1>
                    {isPendingUser ? "Loading" : errorUser ? "Error Occured." :
                        <div className="user">
                            <img className='prf' src={dataUser.image} alt="" />
                            <span>{dataUser.username}</span>
                            {!isNaN(data.ratingStars / data.starNumber) &&
                                <div className="stars">
                                    {Array(Math.round(data.ratingStars / data.starNumber)).fill().map((item, i) => (
                                        <img src={myImg} alt="" key={i} />
                                    ))}
                                    <span>{Math.round(data.ratingStars / data.starNumber)}</span>
                                </div>}
                        </div>}
                    <div className="CoverImg">
                         <img src={data.coverImg} alt="Cover" />
                    </div>
                    <h2>Description</h2>
                    <p>{data.description}</p>
                    {isPendingUser ? "Loading" : errorUser ? "Error Occurred." :
                        <div className="seller">
                            <h2>About the Seller</h2>
                            <div className="user">
                                <img className='prf' src={dataUser.image} alt="X" />
                                <div className="info">
                                    <span>{dataUser.username}</span>
                                    {!isNaN(data.ratingStars / data.starNumber) && <div className="stars">
                                        {Array(Math.round(data.ratingStars / data.starNumber)).fill().map((item, i) => (
                                            <img src={myImg} alt="" key={i} />
                                        ))}
                                        <span> {Math.round(data.ratingStars / data.starNumber)}</span>
                                    </div>}
                                    <button>Contact Me</button>
                                </div>
                            </div>
                        </div>}
                            <Reviews gigID={id} />
                </div>
                <div className="shortTitle">
                    <div className="price">
                        <h3>{data.serviceTitle}</h3>
                        <h3>$ {data.price}</h3>
                      
                    </div>
                    <p>{data.shortDesc}</p>
                    <h3>Features:</h3>
                   <div className="featureList">
                        {data.features.map((feature, index) => (
      <div key={index} className='featureItem'> <img src={featureImg} alt="" /> <p>{feature}</p></div>   
  ))}
</div>
                    <div className="delivery">
                         <div className="deliverytime"> <img src={deliveryImg} alt="" /> <h3>{data.deliveryTime} Delivery</h3> </div>
                        <div className="revision"><img src={revisionImg} alt="" />  <h3>{data.revisionNumber} Revisions</h3> </div> 
                    </div>             
                    <Link to={`/payment/${id}`}><button className='orderBtn'>ORDER</button></Link>                   
                </div>
            </div>}
        </div>

    )
}

export default SingleGig;

