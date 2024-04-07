import React from 'react'
import './css/SingleNews.scss'
import myImg from './img/stars.png'
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import Reviews from './Reviews';
import deliveryImg from './img/clock.png'
import revisionImg from './img/revisionTime.png'
import featureImg from './img/featureImg.png'

function SingleNews() {

    const { id } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['singleNews'],
        queryFn: () =>
            newRequest.get(`/news/singleNews/${id}`).then((res) => {
                return res.data;
            })
    });


    return (
        <div className='singleNews'>
            {isPending ? "Loading" : error ? "Error Occurred." : <div className="container">
                <div className="caption">{data.caption}</div>
                <div className="imgContainer">
                    <img src={data.image[0]} alt="" />
                </div>
                <h3>{data.description}</h3>
            </div>}
            <div className='comments'>
                <h2>Comments</h2>
                <br />
               
                <input type="text" placeholder='Add a comment' />
                <div className="btns">
                    <button className='add'>ADD</button>
                    <button className='cancel'>CANCEL</button>
                 </div>

            </div>
        </div>

    )
}

export default SingleNews;

