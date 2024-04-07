import React from 'react'
import '../Css/AllChat.scss'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment'
import newRequest from '../../utils/newRequest';

function AllChat() {

  const queryClient = useQueryClient()
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  const { isPending, error, data } = useQuery({
    queryKey: ['allChats'],
    queryFn: () =>
      newRequest
        .get('/allChats').then((res) => {
      return res.data;
      })
  });

    const mutation = useMutation({
    mutationFn: (ChatBoxID) => {
      return newRequest.put(`/allChats/${ChatBoxID}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allChats"]);
    },
  });

  const handleRead = (ChatBoxID) => {
    mutation.mutate(ChatBoxID);
  };

  return (
  
    <div className='allChat'>
      {isPending ? "Pending" : error ? "Error Occurred" :
        <div className="container">
        <div className="title">
          <h1>All Messages</h1>
        </div>
        <table>
          <tr>
            <th>{activeUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Recent Message</th>
            <th>Date</th>
             <th>Action</th>
            </tr>
            {data.map((chat)=>(          <tr key={chat.ChatBoxID}>
            <td>{activeUser.isSeller ? chat.buyerId : chat.sellerId}</td>
            <td>  <Link to={`/singleChat/${chat.ChatBoxID}`} className="link">
                {chat?.recentMessage?.substring(0, 100)}...
              </Link>.</td>
              <td>{moment(chat.updatedAt).fromNow()}</td>
              <td>
 {((activeUser.isSeller && !chat.readBySeller) ||
                    (!activeUser.isSeller && !chat.readByBuyer)) && (
                    <button onClick={() => handleRead(chat.ChatBoxID)}>
                      Mark as Read 
                    </button>
                  )}
              </td>
          </tr>))}

        </table>
      </div>}
    </div>
  )
}

export default AllChat
