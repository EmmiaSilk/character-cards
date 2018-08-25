"use strict";

const Protocol = {
  communicationPartner: null,
  methods: {
    ready: 'READY', say: 'SAY'
  }
};

function Message(method) {
  this.method = method;
}

Protocol.sendMessage = function(message) {
  this.communicationPartner.postMessage(message, "*");
}

Protocol.recieveMessage = function(event) {
  switch (event.data.method) {
    case Protocol.methods.ready:
      Protocol.onReady(event.source);
      break;
    case Protocol.methods.say:
      Protocol.onSay(event.data.text);
      break;
    case undefined:
      Protocol.exceptionUndefinedMethod(event.data);
    default:
      Protocol.exceptionInvalidMethod(event.data);
  }
}

// EVENTS
Protocol.onReady = function(source) {}
Protocol.onSay = function(output) {
  console.log(output);
}

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


///// Error handling
Protocol.exceptionInvalidMethod = function(message, method) {
  console.error(Error('Method "'+method+'" not valid in cross-frame communication.'));
  console.log(message);
}
Protocol.exceptionUndefinedMethod = function(message) {
  Error('Undefined method in cross-frame communication.');
  console.log(message);
}
