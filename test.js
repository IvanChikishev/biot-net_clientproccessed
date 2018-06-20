const cliget = require('./cliget');
const WebSocket = require('ws');




async function Start() {
    const ws = new WebSocket("http://127.0.0.1:3303");


    ws.on('open', async () => {
        let stream = new cliget(ws);
    

        while(true) {

            let getBalanceState = await stream.send(['getBalance', 1]);
            console.log(getBalanceState);

            await new Promise(res => setTimeout(res, 1000));
        }
    });

    return 'ok'
}


Start().then(console.log).catch(console.error);