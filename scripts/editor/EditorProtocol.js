// This script modifies the functions from /common/protocol.js
"use strict";

Protocol.onReady = function(source) {
  console.log("Ready!");
  Protocol.communicationPartner = source;
}
