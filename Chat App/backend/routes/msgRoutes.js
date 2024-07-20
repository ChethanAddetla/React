const express = require('express')
const ConversationsModel = require('../models/Conversations')
const userModel  = require('../models/Users')
const messageModel = require('../models/Messages')
const msgRoutes = express.Router();

msgRoutes.post('/conversation',async (req,res)=>{
    try{
        const {senderId,receiverId} = req.body;
        // const array=[];
        // array.push(senderId)
        // array.push(receiverId)
        const newConversation = new ConversationsModel({members:[senderId,receiverId]})
        await newConversation.save();
        res.send({msg:"Conversation created Successfully"})
 
    }
    catch(error){
        console.log(error,'error')

    }
})



msgRoutes.get('/conversation/:userId',async(req,res)=>{
    try{
        const userId = req.params.userId
        const conversations  = await ConversationsModel.find({members:{$in:[userId]}});
        const conversationUserData =  await Promise.all (conversations.map(async(conversation)=>{
            const receiverId = conversation.members.find((member)=>member !== userId)
            // console.log(await userModel.findById(receiverId))
            let temp = await userModel.findById(receiverId)
            return {user:{email:temp.email,fullname:temp.fullname},conversationId:conversation._id};
        })
    )
        console.log(conversationUserData)
        res.status(200).json(await conversationUserData)
    }
    catch(error){
        console.log(error,'error')
    }
})

msgRoutes.post('/message',async(req,res)=>{
    try{
    const {conversationId,senderId,message,receiverId} = req.body;
    if(!senderId||!message || !receiverId){
       return res.send({msg:"Please fill all required fields"})
    }
    if(!conversationId){
        const newConversation = new ConversationsModel({members:[senderId,receiverId]})
        await newConversation.save();
        const newMessage = new messageModel({conversationId:newConversation._id,senderId,message})
        newMessage.save();
       return res.send({msg:"Message sent successfully !"})
    }
    const newMessage = new messageModel({conversationId,senderId,message})
    newMessage.save();
    res.send({msg:"Message sent successfully !"})
    }
    catch(error){
        console.log(error,"error");
    }
})


msgRoutes.get('/message/:conversationId',async (req,res)=>{
    try{
        const conversationId = req.params.conversationId;
        if(!conversationId){
           return res.send([])
        }
        const messages = await messageModel.find({conversationId})
        const messageUserData = await Promise.all(
            messages.map(async (message)=>{
                const user = await userModel.findById(message.senderId);
                return {user:{email:user.email,fullname:user.fullname},message:message.message};
            })
        )
        res.send({messageUserData})
    }
    catch(error){
        console.log("error",error);
    }
})

module.exports = msgRoutes
