#!/usr/bin/env node

var args = require('args')

args
    .option('rport', 'The remote mqtt port', 3000)
    .option('rhost', 'The remote mqtt host', 'localhost')
    .option('rprotocol', 'The remote mqtt protocol', 'ssl')
    .option('rusername', 'The remote mqtt username', 'username')
    .option('rpassword', 'The remote mqtt password', 'password')
    .option('lport', 'The local mqtt port', 3000)
    .option('lhost', 'The local mqtt host', 'localhost')
    .option('lprotocol', 'The local mqtt protocol', 'ws')
    .option('lusername', 'The local mqtt username', 'username')
    .option('lpassword', 'The local mqtt password', 'password')
    .command('node', 'Serve your static site', ['n'])

const flags = args.parse(process.argv)

if (flags.remoteport) {
    console.log(`Remote port ${flags.rport}`)
}

if (flags.rhost) {
    console.log(`Remote host ${flags.rhost}`)
}

if (flags.lemoteport) {
    console.log(`Local port ${flags.lport}`)
}

if (flags.lhost) {
    console.log(`Local host ${flags.lhost}`)
}

var mqtt = require('mqtt');

/**
 * remote connect
 */
var remote = mqtt.connect({
    "host": `${flags.rhost}`,
    "port": `${flags.rport}`,
    "protocol": `${flags.rprotocol}`,
    "username": `${flags.rusername}`,
    "password": `${flags.rpassword}`
});

/**
 * local connect
 */
var local = mqtt.connect({
    "host": `${flags.lhost}`,
    "port": `${flags.lport}`,
    "protocol": `${flags.lprotocol}`,
    "username": `${flags.lusername}`,
    "password": `${flags.lpassword}`
});

remote.on('connect', function () {
    console.log('Remote running ...');
    remote.subscribe('#');
});

local.on('connect', function () {
    console.log('Local running ...');
});

process.on('uncaughtException', function (message) {
    console.log(message);
    if(!remote.connected) remote.reconnect()
    if(!local.connected) local.reconnect()
});

remote.on('message', function (topic, message) {
    // Data must be json
    var data = JSON.parse(message.toString());
    local.publish(topic, JSON.stringify(data, "", "\t"))
});