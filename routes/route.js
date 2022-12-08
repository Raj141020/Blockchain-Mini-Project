const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')

router.get('/assets-api',controller.getcoin)

router.get('/text',function(a,b){
    b.send({msg:"All good bro"})
})

module.exports = router;
