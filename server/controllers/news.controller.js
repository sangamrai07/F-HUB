const { request } = require("express");
const News = require("../models/news.js")

const createNews = async (req, res) => {
    const newNews = new News({
        ...req.body
    });

   try {
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
} catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message }); 
}
};

const deleteNews = async (req, res) => {
    try {
        // Check if the gig exists
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).send('News post does not exist.');
        }

        // Check if the user owns the gig
        if (news.userID !== req.userId) {
            return res.status(403).send('You do not own this post.');
        }

    
        await News.findByIdAndDelete(req.params.id);
        res.status(200).send("News post deleted successfully.");

    } catch (err) {
        console.log(err);
        res.status(500).send("Error Occurred: " + err);
    }
};

const getAllNews = async (req, res) => {
  const q = req.query;

  const filters = {
    ...(q.userID && { userID: q.userID })
  };

 
try {
  const news = await News.find(filters)
  return res.status(200).send(news); 
} catch (err) {
  console.error(err);
  return res.status(500).send("Internal Server Error");
}
};




const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).send("News post not found.");
    }
    res.status(200).send(news);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send("Invalid news ID.");
    } else {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  }
};

const editNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).send("News post not found.");
        }

        if (news.userID !== req.userId) {
            return res.status(403).send('You do not own this news post.');
        }

        // Update the news post with the data from req.body
        Object.assign(news, req.body);
        const updatedNews = await news.save();

        res.status(200).send(updatedNews);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).send("Invalid news ID.");
        } else {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    }
};



module.exports = {createNews, deleteNews, getAllNews, getSingleNews, editNews}