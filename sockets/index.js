const express = require('express');
function connectToXStore(req,res){
  const router = express.Router();
    
  
    router.get("/",(req,res) => {
      res.send('FORM FOR LOGIN')
    });
    const config = {
      url: req.body.url,
      accountNumber: rep.body.accountNumber,
      pw: re.body.pw,
    };
    return  res.status(200).json(config);
  }

module.exports = connectToXStore;
