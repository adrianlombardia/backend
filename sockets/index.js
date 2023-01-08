const connectToXStore =require('express').Router();
const { WebSocket } = require('ws');

connectToXStore.get("/",(req,res) => {
  res.send('FORM FOR LOGIN')
})

//conected
connectToXStore.post("/login", async (req,res)=> {
  try{
    const config = {
      url:  req.body.url,
      accountNumber:req.body.accountNumber,
      pw: req.body.accountNumber
    }
    const ws = new WebSocket(config.url);
  
    ws.on('open', () => {
      send({
        command: 'login',
        arguments: {
          userId: config.accountNumber,
          password: config.pw,
        },
      });
    });

    const send = (message) => {
      try {
        const msg = JSON.stringify(message);
        ws.send(msg);
        res.json('Sent ' + msg.length + ' bytes of data: ' + msg);
      } catch(Exception) {
        res.json('Error while sending data: ' + Exception.message);
      }
    };

   res.status(200).json(config);
  }catch (err){
    res.status(500).json(err) 
 }
})


module.exports = connectToXStore;
