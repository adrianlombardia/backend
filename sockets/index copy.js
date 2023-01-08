const { WebSocket } = require('ws');

const CONFIG = {
  url: 'wss://xs5.xopenhub.pro/xoh/',
  accountNumber: 14226576,
  pw: 'xoh24348',
};

const ws = new WebSocket(CONFIG.url);

const connectToXStore = () => {
  
  const send = (message) => {
    try {
      const msg = JSON.stringify(message);
      ws.send(msg);
      console.log('Sent ' + msg.length + ' bytes of data: ' + msg);
    } catch(Exception) {
      console.error('Error while sending data: ' + Exception.message);
    }
  };

  const getAllSymbols = () => {
    const msg = {};
    msg.command = "getAllSymbols";
    console.log('Getting list of symbols');
    send(msg);
  };

  ws.on('open', () => {
    send({
      command: 'login',
      arguments: {
        userId: CONFIG.accountNumber,
        password: CONFIG.pw,
      },
    });
  });

  ws.onmessage = (evt) => {
    console.log("Received: " + evt.data);
      
    try {
      var response = JSON.parse(evt.data);
      if(response.status == true) {
        if(response.streamSessionId != undefined) {
          // We received login response
          getAllSymbols();
        } else {
          // We received getAllSymbols response
          console.log(response.returnData, 'Received data from XStore');
        }
      } else {
        alert('Error: ' + response.errorDescr);
      }
    } catch (Exception) {
      alert('Fatal error while receiving data! :(');
    }
  };

  ws.onclose = function() {
    console.log('Connection closed');
  };
}

module.exports = {
  connectToXStore,
};
