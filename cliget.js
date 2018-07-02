const events = require('events');


const cliget = function(socket) {
  const eventsHandle = new events();

  socket.on('message', function message(stateData) {
    stateData = JSON.parse(stateData);

    eventsHandle.emit(`cligetevent:${stateData.id}:${stateData.name}`, [stateData.status, stateData.source]);
  });

  let personal = 1;
  return {
    send: async function(params) {
      params['id'] = personal += 1;


      return new Promise(resolve => {
        eventsHandle.on(`cligetevent:${personal}:${params.name}`, function event(resource) {
          return resolve(resource);
        });

        socket.send(JSON.stringify(params));
      });
    }
  };
}

module.exports = cliget;
