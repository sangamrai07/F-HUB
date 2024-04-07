import { useQuery } from '@tanstack/react-query';
import React from 'react'
import newRequest from '../../utils/newRequest';
import '../Css/News.scss';
import NewsCard from '../../assets/NewsCard';

function News() {

  const { isPending, error, data } = useQuery({
    queryKey: ['news'],
    queryFn: () =>
       newRequest.get(`/news`).then((res) => {
      return res.data;
      })
  });
    
  return (
      <div className='news'>
          <br />
            <div className="cards">
          {isPending ? "Extracting" : error ? "Error Occurred !!" : data.map((news) => (
            <NewsCard key={news._id} item={news} />
          ))}
        </div>
      <hr />
    </div>
  )
}

export default News
