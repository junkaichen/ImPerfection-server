const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const UserModel = require('../models/user.schema');

router.get('/all_users', async (req,res) => {
    const allUsers = await UserModel.find();
    res.status(200).json({
        users: allUsers
      }); 
});

router.get('/:userId/followers', async (req,res) => {
    const { userId } = req.params;
    const userInstance = await UserModel.findOne({ userId });
    if (userInstance){
        res.status(200).json({
            follower_list: userInstance.follower_list
          }); 
    }else{
        res.status(400).json({
            message: "user not found"
          }); 
    }
    
});

router.patch('/:userId/follow/:follow_userId', async (req,res) => {
    // TODO: need token verification later
    const { userId, follow_userId } = req.params; 
    const userInstance = await UserModel.findOne({ userId });
    const follow_userInstance = await UserModel.findOne({ userId: follow_userId });
    if (userInstance && follow_userInstance){
        if (!userInstance.following_list.includes(follow_userId)){
            userInstance.following_list.push(follow_userId);
        }
        if (!follow_userInstance.follower_list.includes(userId)){
            follow_userInstance.follower_list.push(userId);
        }
            
        res.status(200).json({
            userInstance,
            follow_userInstance
          }); 
    }else{
        console.log(userInstance)
        console.log(follow_userInstance)
        res.status(400).json({
            message: "user not found"
          }); 
    }
    
});

// router.post('/changeUsername', async (req,res) => {
//     const {userId, userName} = req.body;
//     try {
//         const confirmedUser = await userService.changeUsername(userId, userName);
//         res.status(200).json(confirmedUser); 
//     }catch(error){
//         res.status(400).json({message: `Fail to change userName of ${userId}`})
//     }
// });

// router.post('/changeTags', async (req,res) => {
//     const {userId, tags} = req.body;
//     try {
//         const confirmedUser = await userService.changeTags(userId, tags);
//         res.status(200).json(confirmedUser); 
//     }catch(error){
//         res.status(400).json({message: `Fail to change tags of ${userId}`})
//     }
// });

// router.post('/changeProfilePic', async (req,res) => {
//     const {userId, profilePic} = req.body;
//     try {
//         const confirmedUser = await userService.changeProfilePic(userId, profilePic);
//         res.status(200).json(confirmedUser); 
//     }catch(error){
//         res.status(400).json({message: `Fail to change profilePic of ${userId}`})
//     }
// });

// router.post('/changeEmail', async (req,res) => {
//     const {userId, email} = req.body;
//     try {
//         const confirmedUser = await userService.changeEmail(userId, email);
//         res.status(200).json(confirmedUser); 
//     }catch(error){
//         res.status(400).json({message: `Fail to change email of ${userId}`})
//     }
// });

// router.post('/changePhoneNumber', async (req,res) => {
//     const {userId, phoneNumber} = req.body;
//     try {
//         const confirmedUser = await userService.changePhoneNumber(userId, phoneNumber);
//         res.status(200).json(confirmedUser); 
//     }catch(error){
//         res.status(400).json({message: `Fail to change phoneNumber of ${userId}`})
//     }
// });

// router.post('/changeDescription', async (req,res) => {
//     const {userId, description} = req.body;
//     try {
//         const confirmedUser = await userService.changeDescription(userId, description);
//         res.status(200).json(confirmedUser); 
//     }catch(error){
//         res.status(400).json({message: `Fail to change description of ${userId}`})
//     }
// });

// router.post('/addFollowing', async (req,res) => {
//     const {userId, moderatorId} = req.body;
//     try {
//         const confirmedUser = await userService.addFollow(userId, moderatorId);
//         console.log(`Successfully finish following moderator ${moderatorId}`)
//         res.status(200).json(confirmedUser); 
//     }catch(error){
//         console.log(error);
//         res.status(400).json({message: `User with ID ${userId} fail to follow moderator ${moderatorId}`})
//     }
// });

// router.post('/deleteFollowing', async (req,res) => {
//     const {userId, moderatorId} = req.body;
//     try {
//         const confirmedUser = await userService.deleteFollow(userId, moderatorId);
//         console.log(`Successfully stop following moderator ${moderatorId}`)
//         res.status(200).json(confirmedUser); 
//     }catch(error){
//         console.log(error);
//         res.status(400).json({message: `User with ID ${userId} fail to stop following moderator ${moderatorId}`})
//     }
// });

module.exports = router;