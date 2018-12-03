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
Protocol.setCharacterValue = function(id, key, value) {
  let message = new Message(Protocol.methods.set);
  message.character = id;
  message.key = key;
  message.value = value;

  this.sendMessage(message);
}
Protocol.setStat = function(id, stat, value) {
  let message = new Message(Protocol.methods.set);
  message.character = id;
  message.key = 'stat';
  message.stat = stat;
  message.value = value;

  this.sendMessage(message);
}

/* Tells window to navigate to a different card */
Protocol.onNavigate = function(mode, position) {
  let tabs = $('#editor>.tabs');
  let current = tabs.find('.tab.selected');
  let next = current;
  // Find the tab to select
  if(mode == 'relative') {
    // Next tab
    if(position === 'next') {
      next = current.next('.tab');
      if(next.length === 0) {
        next = tabs.children().first();
      }
    }
    // Previous tab
    else if (position === 'back') {
      next = current.prev('.tab');
      if(next.length === 0) {
        next = tabs.children().last();
      }
    }
  }
  // Tab by ID
  else if (mode === 'absolute') {
    next = tabs.find('.tab[data-character="'+position+'"]');
    if(next.length === 0) {
      next = current;
    }
  }
  // Select the tab
  console.log(next);
  Forms.selectTab(next);
}
