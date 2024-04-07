import React, { useEffect, useRef } from 'react';
import '../Css/Gigs.scss';
import { useState } from 'react';
import GigCard from '../../assets/GigCard';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';

function Gigs() {

  const [showMenu, setShowMenu] = useState(false);
  const [sort, setSort] = useState("createdAt");
  const minPrice = useRef();
  const maxPrice = useRef();


 const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
       newRequest.get(`/gigs${location.search}&min=${minPrice.current.value}&max=${maxPrice.current.value}&sort=${sort}`).then((res) => {
      return res.data;
      })
  });


  

  const SortBy = (type) => {
    setSort(type);
    setShowMenu(false);
  };



  useEffect(() => {
    refetch()
  },[sort])

  const apply = () => {
    refetch()
  }

  return (
    <div className='gigs'>
      <div className="container">
        <hr />
        <h1>{category}</h1>
        <div className="menu">
          <div className="left">
            <span>Price:</span>
            <input ref={minPrice} type="number" placeholder='min' />
            <input ref={maxPrice} type="number" placeholder='max' />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className='sort'>Sort By:</span>
            <span className='sortType'>{sort === "price" ? "Price" : "Newest"}</span>
            <img src="" alt="X" onClick={() => setShowMenu(!showMenu)} />
            {showMenu && (<div className="dropMenu">
              <span onClick={() => SortBy("price")}>Price</span>
              <span onClick={() => SortBy("createdAt")}>Newest</span>
            </div>)}
          </div>
        </div>
        <div className="cards">
          {isPending ? "Extracting" : error ? "Error Occurred !!" : data.map((gig) => (
            <GigCard key={gig._id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;


