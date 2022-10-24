"use strict";

var clients = [];

const addClient = (id, socket, status, roomName) => {
    clients.push({
        id: id,
        socket: socket,
        status: status,
        roomName: roomName
    });
}

const deleteClient = (i) => {
    clients.splice(i,1);
}

module.exports = {
    clients,
    addClient,
    deleteClient,
};