import React from 'react';
import './css/NewsCard.scss';
import { Link } from 'react-router-dom';

function NewsCard({ item }) {

  return (
    <Link to={`/singleNews/${item._id}`} className='link'>
      <div className='newsCard'>
        <div className="info">
                  <p>{item.description.slice(0, 200)}...</p>
                    <img src={item.image[0]} className="coverImg" alt="" />
              </div>        
      </div>
    </Link>
  );
}

export default NewsCard;