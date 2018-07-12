

# biot-wsclient
## Websocket client-plugin for [biot-wsocket](https://github.com/remmelgas/biot-wsocket) parse server data, supports async / await.

</br></br>

## How to install
</br>


#### install dependencies
```
> npm --save -i https://github.com/remmelgas/biot-wsclient.git
> npm --save -i ws
```



## Example client


</br></br>

```javascript
const wsclient = require('biot-wsclient');
const ws = require('ws');


function Start() {
    let client = new ws('ws://127.0.0.1:3303');

    client.on('open', async () => {
        let stream = wsclient(client);


        let result = await stream.send({
            name: 'getMyDeviceWallets', args: []
        });


        console.log(result[1]);
    });

}

Start();
```
#### terminal
```
> node client
```