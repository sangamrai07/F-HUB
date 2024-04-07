import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'; // Import createBrowserRouter and RouterProvider
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()   // React Query Client

import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; 


import Navbar from './assets/Navbar.jsx';
import Home from './components/Pages/Home.jsx';
import AddGigs from './components/Pages/AddGigs.jsx';
import AllChat from './components/Pages/AllChat.jsx';
import Gigs from './components/Pages/Gigs.jsx';
import MyGigs from './components/Pages/MyGigs.jsx';
import Order from './components/Pages/Order.jsx';
import Chat from './components/Pages/Chat.jsx'
import "./app.scss"
import Signup from './components/Pages/Signup.jsx'
import SingleGig from './assets/SingleGig.jsx';
import DemoLogin from './components/Pages/DemoLogin.jsx';
import Footer from './assets/Footer.jsx';
import ForgetPasswordPage from './components/Pages/ForgetPasswordPage.jsx';
import EnterForgottenEmail from './components/Pages/EnterForgottenEmail.jsx';
import VerificationToken from './components/Pages/VerificationToken.jsx';
import PaymentSuccess from './components/Pages/PaymentSuccess.jsx';
import Payment from './components/Pages/Payment.jsx';
import Jobs from './components/Pages/Jobs.jsx';
import SingleJob from './assets/SingleJob.jsx';
import MyJobs from './components/Pages/MyJobs.jsx';
import AddJobs from './components/Pages/AddJobs.jsx';
import AddNews from './components/Pages/AddNews.jsx';
import SingleNews from './assets/SingleNews.jsx';
import MyNews from './components/Pages/MyNews.jsx';
import News from './components/Pages/News.jsx';
import EditNews from './components/Pages/EditNews.jsx';





function App() {
  const LayOut = () => {
    return (
      <>
            <QueryClientProvider client={queryClient}>
      <Navbar/>
          <Outlet />
          <Footer />
           <ToastContainer />
    </QueryClientProvider>      
      </>
    );
  };


  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayOut />, 
      children: [
        {
          path: '/',
          element: <Home />,
        },
         {
          path: '/addGigs',
          element: <AddGigs/>,
        },
        {
          path: '/addJobs',
          element: <AddJobs/>,
        },
          {
          path: '/allChat',
          element: <AllChat />,
        },
        {
          path: '/singleChat/:id',
          element: <Chat/>,
        },
           {
          path: '/gigs',
          element: <Gigs />,
        },
            {
          path: '/myGigs',
          element: < MyGigs/>,
        },
         {
          path: '/myJobs',
          element: < MyJobs/>,
        },
                  {
          path: '/orders',
          element: <Order />,
        },
                                    {
          path: '/singleGig/:id',
          element: <SingleGig />,
        }, 
          {
          path: '/singleJob/:id',
          element: <SingleJob />,
        }, 
        {
          path: '/Signup',
          element: <Signup />,
        },   
                {
          path: '/login',
          element: <DemoLogin />,
        },
                  {
          path: '/resetForgottenPassword',
          element: <ForgetPasswordPage />,
        }, 
                      {
          path: '/forgottenEmail',
          element: <EnterForgottenEmail />,
        },
                         {
          path: '/verificationToken/:id',
          element: <VerificationToken />,
        },
                            {
          path: '/paymentSuccess',
          element: <PaymentSuccess />,
        },
                              {
          path: '/payment/:id',
          element: <Payment />,
        },
                                      {
          path: '/jobs',
          element: <Jobs />,
        },
                                       {
          path: '/addNews',
          element: <AddNews />,
        },
                                       {
          path: '/singleNews/:id',
          element: <SingleNews />,
        }, 
                                      
                {
          path: '/news',
          element: <News />,
        },  
           {
          path: '/myNews',
          element: <MyNews/>,
        },  
        {
          path: '/editNews/:id',
          element: <EditNews/>,
        },                         
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

