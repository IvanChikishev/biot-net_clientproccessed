const EventEmitter = require('events');

/**
 * @description 
 */
class _cliget  {
    constructor(ws) {
        this.ws = ws;
        this.waiterID = -1;
        this.events = new EventEmitter();

        this.ws.on('message', (TempData) => {
            TempData = JSON.parse(TempData);
            this.events.emit(`event_wsnet:${TempData[0]}:${TempData[1]}`, TempData);
        });
    }

    send(TempData) {
        return new Promise(resolve => {
            this.events.on(`event_wsnet:${this.waiterID}:${TempData[0]}`, (data) => {

                if(data[2] == -1) {
                    throw(data[3]);
                }

                return resolve(data);
            });

            TempData.unshift(this.waiterID++);
            this.ws.send(JSON.stringify(TempData));
        });
    }
}

module.exports = _cliget;
