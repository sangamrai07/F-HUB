const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');




const userRoute = require('./routes/user.route.js');
const gigRoute = require('./routes/gig.route.js');
const orderRoute = require('./routes/order.route.js');
const allChatRoute = require('./routes/allChat.route.js');
const chatRoute = require('./routes/chat.route.js');
const reviewRoute = require('./routes/review.route.js');
const authRoute = require('./routes/auth.route.js');
const jobRoute = require('./routes/job.route.js')
const newsRoute = require('./routes/news.route.js')




const app = express();
app.use(express.json());
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(cookieParser());

dotenv.config();
mongoose.set('strictQuery', true);

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connection successful!!");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}


app.use(express.json())
app.use(cookieParser())




app.use("/server/users", userRoute)
app.use("/server/auth", authRoute)
app.use("/server/gigs", gigRoute)
app.use("/server/orders", orderRoute)
app.use("/server/allChats", allChatRoute)
 app.use("/server/chats", chatRoute)
app.use("/server/reviews", reviewRoute)
app.use("/server/jobs", jobRoute)
app.use("/server/news", newsRoute)



app.listen(3001, () => {
    dbConnect();
    console.log("Server is running");
});
