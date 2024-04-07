import React, { useState } from 'react';
import './css/Review.scss';
import myImg from './img/stars.png';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';
import threeDot from './threeDot.jpg';

function Review({ review }) {
    const queryClient = useQueryClient();
    const { isPending, error, data } = useQuery({
        queryKey: [review.userID],
        queryFn: () =>
            newRequest.get(`/users/${review.userID}`).then((res) => {
                return res.data;
            }),
    });
    const [showMenu, setShowMenu] = useState(false);

    const handleEdit = (e) => {
        e.preventDefault();
       
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        await newRequest.delete(`/reviews/${review._id}`);
        queryClient.invalidateQueries([review.userID]);
    };

    return (
        <>
            <div className="review">
                {isPending ? (
                    "Loading"
                ) : error ? (
                    "Error Occurred"
                ) : (
                    <div className="user">
                        <img className="prf" src={data.image} alt="" />
                        <div className="info">
                            <span>{data.username}</span>
                        </div>
                        <img className='threeDot' src={threeDot} onClick={() => setShowMenu(!showMenu)} />
                        {showMenu && (<div className="dropMenu">
                            <span className='edit' onClick={handleEdit}>Edit</span>
                            <span className='delete' onClick={handleDelete}>Delete</span>
                        </div>)}
                    </div>
                )}
                <div className="stars">
                    {
                        Array(review.ratingStars).fill().map((item, i) => (
                            <img src={myImg} alt="" className='revStars' key={i} />
                        ))
                    }
                    <span className='revStarCount'>{review.ratingStars}</span>
                </div>
                <p>{review.description}</p>
            </div>
        </>
    );
}

export default Review;

