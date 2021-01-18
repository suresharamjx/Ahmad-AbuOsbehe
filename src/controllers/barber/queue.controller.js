'use strict';
const Interface = require('../../Models/queue-interface');
const interfaceSql = new Interface('queue');
const getQueue = async (req, res, next) => {
  // get one or all queues

  try {
    let queueResponse;

    const { barberID, clientID, queueID } = req.params;

    if (queueID != 0) {
      //get one queue for one barber
      queueResponse = await interfaceSql.read(queueID, false, false);
    } else if (barberID != 0) {
      console.log('barberID, clientID, queueID', barberID, clientID, queueID);
      //get all queues for one barber
      queueResponse = await interfaceSql.read(false, barberID, false);
    } else if (clientID != 0) {
      //get all queues for one client
      queueResponse = await interfaceSql.read(false, false, clientID);
    } else {
      //get all queues for all barbers for all clients
      queueResponse = await interfaceSql.read(false, false, false);
    }
    res.send(queueResponse.rows);
  } catch (error) {
    res.json(error);
  }
};

const deleteQueue = async (req, res, next) => {
  // delete one or all queues

  try {
    let queueResponse;
    const { barberId } = req.params;
    const { clientID } = req.params;
    const { queueID } = req.params;

    //delete one queue for one barber
    if (queueID != 0) {
      queueResponse = await interfaceSql.delete(queueID, false, false);
    } else if (barberId != 0) {
      //delete all queues for this barber
      queueResponse = await interfaceSql.delete(false, barberId, false);
    } else if (clientID != 0) {
      //delete all queues for this client
      queueResponse = await interfaceSql.delete(false, false, clientID);
    }

    res.send(queueResponse);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getQueue,
  deleteQueue,
};
