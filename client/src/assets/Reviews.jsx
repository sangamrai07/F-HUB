import React from 'react';
import './css/Reviews.scss';
import Review from './Review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../utils/newRequest';

function Reviews({ gigID }) {
    const queryClient = useQueryClient()
    const { isFetching, error, data } = useQuery({
        queryKey: ['reviews'],
        queryFn: () =>
            newRequest.get(`/reviews/${gigID}`).then((res) => {
                return res.data;
            }),
    });


     const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])
    }
  });


    const handleSubmit = (e) => {
        e.preventDefault();
        const description = e.target[0].value
        const ratingStars = e.target[1].value
        mutation.mutate({ gigID, description, ratingStars });
         
    e.target[0].value = '';
    e.target[1].value = '1';

    }

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {isFetching ? (
                <p>Pending!</p>
            ) : error ? (
                <p>Error Occurred</p>
            ) : (
                data.map((review) => <Review key={review._id} review={review} />)
            )}
            <hr />
            <div className="addReview">
               
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Add a review...' />
                     <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
                </form>
            </div>
            
        </div>
    );
}

export default Reviews;
