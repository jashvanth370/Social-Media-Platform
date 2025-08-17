const Message = require('../models/Message')

   exports.createMessage = async (req, res) => {
       try {
           const { receiverId, senderId, messageText } = req.body;
           const message = new Message({
               receiverId,
               senderId,
               messageText
           });
           const savedMessage = await message.save();
           res.status(201).json(savedMessage);
       } catch (err) {
           res.status(500).json({ error: 'Error creating message' });
       }
   };

   exports.SendMessage = async (req, res) => {
       const { user1, user2 } = req.params;
       try {
           const messages = await Message.find({
               $or: [
                   { senderId: user1, receiverId: user2 },
                   { senderId: user2, receiverId: user1 }
               ]
           }).sort({ createdAt: 1 });
           res.status(200).json(messages);
       } catch (error) {
           res.status(500).json({ error: err.message });
       }
   };

   exports.ReadMessage = async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.messageId,
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.GetAllMessages = async (req,res) =>{
    try{
        const messages = await Message.find();
        res.json(messages);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}