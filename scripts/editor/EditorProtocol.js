// This script modifies the functions from /common/protocol.js
"use strict";

// TRIGGERS
/* Tells the other window to alter a value in the dataset */
Protocol.setCharacterValue = function(character, key, value) {
  let message = new Message(Protocol.methods.set);
  message.character = character;
  message.key = key;
  message.value = value;

  this.sendMessage(message);
}
