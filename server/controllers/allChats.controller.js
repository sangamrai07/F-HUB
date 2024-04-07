
const ChatBox = require("../models/chatBox")


const getAllChat = async (req, res) => {
try {
    const allChats = await ChatBox.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    )
    res.status(200).send(allChats);
  } catch (err) {
    console.log(err);
  }
}
const getSingleChat = async (req, res) => {
   try {
    const singleChat = await ChatBox.findOne({ ChatBoxID: req.params.id });
       if (!singleChat) {
           return res.status(404).send("Chat Not found");
       }
    res.status(200).send(singleChat);
  } catch (err) {
    console.log(err);
  }
}

const createChat = async (req, res) => {
    // Check if sellerId and buyerId are the same
    if (req.userId === req.body.to) {
        return res.status(400).send("Cannot create conversation with yourself.");
    }

    const newChatBox = new ChatBox({
        ChatBoxID: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
    });

    try {
        const savedChat = await newChatBox.save();
        res.status(201).send(savedChat);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while creating the conversation.");
    }
}


const updateReadStatus = async (req, res) => {
   try {
    const updatedChat = await ChatBox.findOneAndUpdate(
      { ChatBoxID: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true })
        },
      },
      { new: true }
    );

    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
  }

}

module.exports = {updateReadStatus,getAllChat,getSingleChat,createChat}