import React from 'react'
import { Link, useParams } from 'react-router-dom'
import '../Css/Chat.scss'

import newRequest from '../../utils/newRequest'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


function Chat() {
 
      const queryClient = useQueryClient()
  const { isFetching, error, data } = useQuery({
    queryKey: ['chats'],
    queryFn: () =>
        newRequest.get(`/chats/${id}`).then((res) => {
            return res.data;
        }),
});

   const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  const { id } = useParams();
  console.log("Chat ID:", id); 

const mutation = useMutation({
  mutationFn: (message) => {
    return newRequest.post("/chats", message);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["chats"]);
  }
});

const handleSubmit =  (e) => {
  e.preventDefault();
  mutation.mutate({
    allChatsID: id, 
    messages: e.target[0].value,
  });
  e.target[0].value = "";
};

  
  return (
    <div className="chat"><div className='container'>
      <span className="chatInfo">
      </span>
     { isFetching? 'Loading': error? 'Error Occurred' : <div className="texts">
       { data.map((msg)=>(  <div className= {msg.userID === activeUser._id ? "sender" : "receiver"} key={msg._id}>
         
         <p>{msg.messages}</p>
        </div>))}
      </div>}
      <hr />
      <form className="chatInput" onSubmit={handleSubmit}>
        <textarea name="" placeholder='Message..' id="" cols="30" rows="2"></textarea>
        <button type='submit'>Send</button>
      </form>
    </div></div>
  )
}

export default Chat
