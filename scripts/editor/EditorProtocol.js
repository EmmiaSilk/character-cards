// This script modifies the functions from /common/protocol.js
"use strict";

Protocol.onGet = function(data) {
  switch (data.type) {
    case 'dataset':
      Protocol.replace(data.type, data.id, charData);
      break;
    default:

  }
}

// TRIGGERS
/* Tells the other window to alter a value in the dataset */
Protocol.setCharacterValue = function(character, key, value) {
  let message = new Message(Protocol.methods.set);
  message.character = character;
  message.key = key;
  message.value = value;

  this.sendMessage(message);
}
