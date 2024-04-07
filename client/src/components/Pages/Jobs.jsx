import { useQuery } from '@tanstack/react-query';
import React from 'react'
import newRequest from '../../utils/newRequest';
import JobCard from '../../assets/JobCard';
import '../Css/Job.scss';

function Jobs() {

  const { isPending, error, data } = useQuery({
    queryKey: ['jobs'],
    queryFn: () =>
       newRequest.get(`/jobs`).then((res) => {
      return res.data;
      })
  });
    
  return (
      <div className='jobs'>
          <br />
            <div className="cards">
          {isPending ? "Extracting" : error ? "Error Occurred !!" : data.map((job) => (
            <JobCard key={job._id} item={job} />
          ))}
        </div>
      <hr />
    </div>
  )
}

export default Jobs
