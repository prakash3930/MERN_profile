const express = require('express');
const uploads = require('../Helpers/uploads');
const { get_Profile, delete_Profile, update_Profile_Password, update_Profile, login, registration } = require('../Controllers/user');
const { authantication } = require('../Middlewares/verifyToken');
const router = express.Router();



router.post('/registration',registration);
router.post('/login',login);
router.post('/update-profile',authantication,uploads,update_Profile);
router.post('/update-pasword',authantication,update_Profile_Password);
router.post('/delete-profile',authantication,delete_Profile);
router.get('/get-profile',authantication,get_Profile);



module.exports = router;