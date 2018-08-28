"use strict";

const Protocol = {
  communicationPartner: null,
  methods: {
    ready: 'READY',
    say: 'SAY',
    set: 'SET',
    replace: 'REPLACE',
    get: 'GET',
  }
};

function Message(method) {
  this.method = method;
}

Protocol.sendMessage = function(message) {
  this.communicationPartner.postMessage(message, '*');
}

Protocol.recieveMessage = function(event) {
  console.log('Message recieved ' + event.data.method);
  switch (event.data.method) {
    case Protocol.methods.ready:
      Protocol.onReady(event.source);
      break;
    case Protocol.methods.say:
      Protocol.onSay(event.data.text);
      break;
    case Protocol.methods.set:
      Protocol.onSet(event.data);
      break;
    case Protocol.methods.replace:
      console.log('Replace message recieved');
      Protocol.onReplace(event.data);
    case Protocol.methods.get:
      Protocol.onGet(event.data);
      break;
    case undefined:
      Protocol.exceptionUndefinedMethod(event.data);
    default:
      Protocol.exceptionInvalidMethod(event.data);
  }
}

// EVENTS
Protocol.onReady = function(source) {
  console.log('Ready!');
}
Protocol.onSay = function(output) {
  console.log(output);
}
Protocol.onSet = function(data) {}
Protocol.onReplace = function(data) {}
Protocol.onGet = function(data) {}

// TRIGGERS
/* Tells the other window that this window is ready */
Protocol.ready = function() {
  let message = new Message(Protocol.methods.ready);
  this.sendMessage(message);
}
/* Tells the other window to output something in Console.log() */
Protocol.say = function(string) {
  let message = new Message(Protocol.methods.say);
  message.text = string;
  this.sendMessage(message);
}
/* Replace a character, definition, or the whole dataset with a new one. */
Protocol.replace = function(type, id, obj) {
  let message = new Message(Protocol.methods.replace);
  message.type = type;
  message.id = id;
  message.obj = obj;
  this.sendMessage(message);
  console.log('Replace message sent');
}
Protocol.get = function(type, id) {
  let message = new Message(Protocol.methods.get);
  message.type = type;
  message.id = id;
  this.sendMessage(message);
}



///// Error handling
Protocol.exceptionInvalidMethod = function(message, method) {
  console.error(Error('Method "'+method+'" not valid in cross-frame communication.'));
  console.log(message);
}
Protocol.exceptionUndefinedMethod = function(message) {
  Error('Undefined method in cross-frame communication.');
  console.log(message);
}
