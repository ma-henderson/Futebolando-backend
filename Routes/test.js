const express = require('express');
const router = express.Router()


// User needs to be able to Edit their profile. Can be new or existing user
router.get(
  '/message/',
  (req, res)=>{
  
   res.send('message')
  }
);

module.exports = router;