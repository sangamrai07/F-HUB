const Chat = require('../models/chat')
const ChatBox = require('../models/chatBox')


const getMessages = async (req, res) => {
         try {
          const messages = await Chat.find({ allChatsID: req.params.id })
    res.status(200).send(messages)
    }
    catch (err) {
        console.log(err)
    }
}

const sendMessages = async (req, res) => {
  const newChat = new Chat({
        allChatsID: req.body.allChatsID,
        userID: req.userId,
        messages: req.body.messages
    })
    try {
        const savedMessage = await newChat.save()
        await ChatBox.findOneAndUpdate({ ChatBoxID: req.body.allChatsID }, {
            $set: {
                readBySeller: req.isSeller,
                readByBuyer: !req.isSeller,
                recentMessage: req.body.messages
            }
        },
            { new: true })
        res.status(201).send(savedMessage)
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = {getMessages,sendMessages}