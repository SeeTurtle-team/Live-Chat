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

const nowTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    var nowTime = hours + ':' + minutes + ':' + seconds;
    return nowTime;
}

module.exports = {
    clients,
    addClient,
    deleteClient,
    nowTime,
};

