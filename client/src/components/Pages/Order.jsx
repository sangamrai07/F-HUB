import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Css/Orders.scss'
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

function Order() {

  const navigate = useNavigate()

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  
  const { isPending, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
       newRequest.get('/orders').then((res) => {
      return res.data;
      })
  });

  const handleContact = async (order) => {
    const sellerID = order.freelancerID
    const buyerID = order.buyerID
    const ChatBoxID = sellerID + buyerID
    
    try {
      const res = await newRequest.get(`/allChats/singleChat/${ChatBoxID}`)
  navigate(`/singleChat/${res.data.ChatBoxID}`)  }
    catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/allChats`, {
          to: activeUser.isSeller? buyerID : sellerID
        })
        navigate(`/singleChat/${res.data.ChatBoxID}`)
      }
      console.log(err)
      
    }
  }

  return (
    <div className='orders'>
      {isPending ? ("Pending ..") : error ?  ("Error Occurred.") :
      <div className="container">
        <div className="title">
          <h1>My Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
             <th>Messages</th>
          </tr>
            {data.map((order) => (
              <tr key={order._id}>
            <td><img className='img' src={order.image} alt="IX" /></td>
          <td>{order.title}</td>
          <td>${order.price}</td>
            <td><button onClick={() => handleContact(order)}>Chat</button></td>
          </tr>))}
        </table>
      </div>}
    </div>
  )
}

export default Order;

