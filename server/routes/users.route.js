const express = require('express');
const router = express.Router();
const {getAllUsers, addUser, editUser,getNotification,deleteNotification,getAllNotifications,resetNotificationCount} = require('../controllers/users.controller.js');


router.get('/', getAllUsers );
router.get('/getallnotifi', getAllNotifications );

router.post('/', addUser );
router.put('/edit/:id', editUser );
router.post('/notification', getNotification );
router.delete('/notification', deleteNotification );
router.post('/resetnotification/:id', resetNotificationCount );

module.exports = router;